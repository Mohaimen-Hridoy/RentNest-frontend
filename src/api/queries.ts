import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Property, PropertyFilterParams, BookingRequest, BookingResponse } from '../types/property';
import { ListingFormValues, EscrowInquiryValues } from '../schemas/validation';

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');
const apiUrl = (path: string) => `${API_BASE_URL}${path}`;

export async function fetchProperties(params: PropertyFilterParams = {}): Promise<{ total: number; data: Property[] }> {
  const query = new URLSearchParams();
  if (params.search) query.append('search', params.search);
  if (params.minPrice) query.append('minPrice', params.minPrice.toString());
  if (params.maxPrice) query.append('maxPrice', params.maxPrice.toString());
  if (params.bedrooms) query.append('bedrooms', params.bedrooms.toString());
  if (params.propertyType && params.propertyType !== 'all') query.append('propertyType', params.propertyType);
  if (params.furnishing && params.furnishing !== 'all') query.append('furnishing', params.furnishing);
  if (params.escrowOnly) query.append('escrowOnly', 'true');
  if (params.sortBy) query.append('sortBy', params.sortBy);

  const res = await fetch(apiUrl(`/api/properties?${query.toString()}`));
  if (!res.ok) {
    throw new Error('Failed to fetch properties from RentNest server');
  }
  return res.json();
}

export async function fetchPropertyById(id: string): Promise<Property> {
  const res = await fetch(apiUrl(`/api/properties/${id}`));
  if (!res.ok) {
    throw new Error('Property not found');
  }
  const json = await res.json();
  return json.data;
}

export async function submitBooking(booking: BookingRequest): Promise<{ success: boolean; data: BookingResponse; message: string }> {
  const res = await fetch(apiUrl('/api/bookings'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking),
  });
  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.message || 'Failed to schedule visit');
  }
  return res.json();
}

export async function createListing(listing: ListingFormValues): Promise<{ success: boolean; data: Property; message: string }> {
  const res = await fetch(apiUrl('/api/properties'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(listing),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to publish listing');
  }
  return res.json();
}

export async function uploadPropertyImages(files: File[]): Promise<string[]> {
  const formData = new FormData();
  files.forEach((file) => formData.append('images', file));
  const res = await fetch(apiUrl('/api/uploads'), { method: 'POST', body: formData });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.message || 'Failed to upload property images');
  }
  return json.data;
}

export async function submitEscrowInquiry(inquiry: EscrowInquiryValues): Promise<any> {
  const res = await fetch(apiUrl('/api/escrow-inquiry'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inquiry),
  });
  if (!res.ok) {
    throw new Error('Failed to initialize escrow');
  }
  return res.json();
}

// ================= React Query Hooks ================= //

export function useProperties(params: PropertyFilterParams) {
  return useQuery({
    queryKey: ['properties', params],
    queryFn: () => fetchProperties(params),
    staleTime: 1000 * 60 * 3, // 3 minutes cache
  });
}

export function useProperty(id: string | null) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchPropertyById(id!),
    enabled: Boolean(id),
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

export function useCreateListing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createListing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}

export function useSubmitEscrow() {
  return useMutation({
    mutationFn: submitEscrowInquiry,
  });
}
