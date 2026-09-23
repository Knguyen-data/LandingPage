'use client';

import { useEffect, useState } from 'react';

import type { DashbookingPlaceSuggestion } from '@/lib/leads/address-suggest';

export function useDashbookingAddressSuggest(query: string, enabled: boolean) {
  const [suggestions, setSuggestions] = useState<DashbookingPlaceSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const trimmedQuery = query.trim();
  const shouldSearch = enabled && trimmedQuery.length >= 3;

  useEffect(() => {
    if (!shouldSearch) {
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/places/suggest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({ query: trimmedQuery }),
        });
        const payload = (await response.json()) as { suggestions?: DashbookingPlaceSuggestion[] };
        const next = payload.suggestions ?? [];
        setSuggestions(next);
        setOpen(next.length > 0);
      } catch {
        if (!controller.signal.aborted) {
          setSuggestions([]);
          setOpen(false);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 280);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [shouldSearch, trimmedQuery]);

  const close = () => setOpen(false);

  return {
    suggestions: shouldSearch ? suggestions : [],
    open: shouldSearch && open,
    loading: shouldSearch && loading,
    close,
    setOpen,
  };
}
