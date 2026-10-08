export type CenterRecord = {
  id: string; name: string; city: string; state: string; zip: string; address: string;
  phone: string; type: string; insurance: string; image: string;
  lat?: number; lng?: number;
};

function field(value: unknown) {
  return typeof value === 'string' || typeof value === 'number' ? String(value).trim() : '';
}

export function normalizeCenter(id: string, data: Record<string, unknown>): CenterRecord {
  return {
    id, name: field(data.name) || 'Auvia center', city: field(data.city), state: field(data.state),
    zip: field(data.zip), address: field(data.address), phone: field(data.phone), type: field(data.type),
    insurance: field(data.insurance) || 'Contact the team to confirm your plan',
    image: field(data.image) || '/images/about-kids.webp',
    lat: typeof data.lat === 'number' ? data.lat : undefined,
    lng: typeof data.lng === 'number' ? data.lng : undefined,
  };
}

export function centerAddress(center: CenterRecord) {
  return [center.address, center.city, center.state, center.zip].filter(Boolean).join(', ');
}

export function centerSlug(center: CenterRecord) {
  return center.city && center.state ? `${center.city.toLowerCase().replace(/\s+/g, '-')}-${center.state.toLowerCase()}` : '';
}
