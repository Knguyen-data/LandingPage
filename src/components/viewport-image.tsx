'use client';

import Image, { type ImageProps } from 'next/image';
import { useEffect, useRef, useState } from 'react';

const transparentPixel = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

/** Keep image geometry in SSR; request below-fold media only near its viewport. */
export default function ViewportImage(props: ImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);
  const eager = props.priority || props.preload || props.loading === 'eager';
  useEffect(() => {
    const image = ref.current;
    if (!image || eager) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setReady(true);
      observer.disconnect();
    }, { rootMargin: '160px 0px' });
    observer.observe(image);
    return () => observer.disconnect();
  }, [eager]);
  return <Image {...props} alt={props.alt} ref={ref} src={ready || eager ? props.src : transparentPixel}
    unoptimized={ready || eager ? props.unoptimized : true}
    data-lazy-image={ready || eager ? 'loaded' : 'waiting'} />;
}
