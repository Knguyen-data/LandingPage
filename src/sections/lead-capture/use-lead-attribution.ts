'use client';

import { useEffect } from 'react';

import {
  dashbookingLeadAttributionDefaults,
  dashbookingLeadStorageKeys,
} from '@/content/lead-capture';

export function captureDashbookingLeadAttribution() {
  if (typeof window === 'undefined') {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const source = params.get('utm_source');
  const campaign = params.get('utm_campaign');

  if (source) {
    sessionStorage.setItem(dashbookingLeadStorageKeys.platform, source.trim().toLowerCase());
  }

  if (campaign) {
    sessionStorage.setItem(dashbookingLeadStorageKeys.campaign, campaign.trim().toLowerCase());
  }
}

export function readDashbookingLeadAttribution() {
  if (typeof window === 'undefined') {
    return dashbookingLeadAttributionDefaults;
  }

  return {
    platform: sessionStorage.getItem(dashbookingLeadStorageKeys.platform) || dashbookingLeadAttributionDefaults.platform,
    campaign: sessionStorage.getItem(dashbookingLeadStorageKeys.campaign) || dashbookingLeadAttributionDefaults.campaign,
  };
}

export function useDashbookingLeadAttribution() {
  useEffect(() => {
    captureDashbookingLeadAttribution();
  }, []);
}