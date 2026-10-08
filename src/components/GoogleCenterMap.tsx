import React from 'react';
import { ExternalLink, MapPin } from 'lucide-react';
export function GoogleCenterMap({ name, address }: { name: string; address: string }) {
  if (!address.trim()) return <div className="h-full min-h-[300px] flex flex-col items-center justify-center gap-3 bg-brand-mint/30 p-8 text-center text-brand-sage"><MapPin size={28} aria-hidden="true" /><p>Map details are unavailable. Please contact the team for this center's address.</p></div>;
  const query = encodeURIComponent(address);
  return <a className="google-center-map" href={`https://www.google.com/maps/search/?api=1&query=${query}`} target="_blank" rel="noopener noreferrer" aria-label={`Open in Google Maps: ${name}, ${address} (new tab)`}>
    <iframe title={`${name} map`} src={`https://maps.google.com/maps?q=${query}&output=embed`} loading="lazy" tabIndex={-1} aria-hidden="true" referrerPolicy="no-referrer-when-downgrade" />
    <span>Open in Google Maps <ExternalLink size={16} aria-hidden="true" /></span>
  </a>;
}
