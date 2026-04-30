'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { supportedLocales, type AppLocale } from '@/lib/i18n/locales';

interface DashbookingLandingLocaleSwitcherProps {
  readonly locale: AppLocale;
  readonly ariaLabel: string;
}

function buildLocalizedHref(
  pathname: string,
  locale: AppLocale,
  search: string,
  hash: string,
): string {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length > 0 && supportedLocales.includes(segments[0] as AppLocale)) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }

  const nextPathname = `/${segments.join('/')}`;
  return `${nextPathname}${search}${hash}`;
}

export function DashbookingLandingLocaleSwitcher({
  locale,
  ariaLabel,
}: DashbookingLandingLocaleSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchSuffix, setSearchSuffix] = useState('');
  const [hashSuffix, setHashSuffix] = useState('');

  useEffect(() => {
    const syncLocation = () => {
      setSearchSuffix(window.location.search);
      setHashSuffix(window.location.hash);
    };

    syncLocation();
    window.addEventListener('hashchange', syncLocation);
    window.addEventListener('popstate', syncLocation);

    return () => {
      window.removeEventListener('hashchange', syncLocation);
      window.removeEventListener('popstate', syncLocation);
    };
  }, []);

  return (
    <nav className="locale-switcher" aria-label={ariaLabel}>
      {supportedLocales.map((item) => {
        const active = item === locale;
        const href = buildLocalizedHref(pathname, item, searchSuffix, hashSuffix);

        return (
          <Link
            key={item}
            href={href}
            className={active ? 'locale-pill active' : 'locale-pill'}
            aria-current={active ? 'page' : undefined}
            onClick={(event) => {
              if (
                event.defaultPrevented ||
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              ) {
                return;
              }

              event.preventDefault();
              router.push(
                buildLocalizedHref(
                  pathname,
                  item,
                  searchSuffix,
                  window.location.hash,
                ),
              );
            }}
          >
            {item.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}
