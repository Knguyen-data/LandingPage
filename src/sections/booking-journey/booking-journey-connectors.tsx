'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';

interface NodeBox {
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly height: number;
  readonly badgeX: number;
  readonly badgeY: number;
  readonly anchorY: number;
}

interface DashbookingLandingBookingJourneyConnectorsProps {
  readonly boardElement: HTMLElement | null;
  readonly connectorIndex: number;
  readonly settled: boolean;
  readonly reducedMotion: boolean;
}

const STROKE = 3.25;
const ARROW = 12;

function measure(board: HTMLElement): NodeBox[] {
  const boardBox = board.getBoundingClientRect();
  const nodes = [...board.querySelectorAll<HTMLElement>('[data-journey-node]')];

  return nodes.map((node) => {
    const box = node.getBoundingClientRect();
    const badge = node.querySelector<HTMLElement>('[data-journey-badge]');
    const badgeBox = badge?.getBoundingClientRect();
    const anchor = node.querySelector<HTMLElement>('[data-journey-anchor]');
    const anchorBox = anchor?.getBoundingClientRect();

    return {
      left: box.left - boardBox.left,
      top: box.top - boardBox.top,
      width: box.width,
      height: box.height,
      badgeX: badgeBox ? badgeBox.left - boardBox.left + badgeBox.width / 2 : box.left - boardBox.left + 18,
      badgeY: badgeBox ? badgeBox.top - boardBox.top + badgeBox.height / 2 : box.top - boardBox.top + 18,
      anchorY: anchorBox
        ? anchorBox.top - boardBox.top + anchorBox.height / 2
        : box.top - boardBox.top + box.height * 0.42,
    };
  });
}

function horizontalPath(from: NodeBox, to: NodeBox): string {
  const y = from.anchorY;
  const x1 = from.left + from.width + 10;
  const x2 = to.left - 18;

  return `M ${x1} ${y} L ${x2} ${y}`;
}

function dropPath(from: NodeBox, to: NodeBox): string {
  const startX = from.left + from.width * 0.5;
  const startY = from.top + from.height + 8;
  const endX = to.left + to.width * 0.5;
  const endY = to.top - 14;
  const midY = startY + (endY - startY) * 0.48;
  const radius = 12;
  const goingLeft = endX < startX;
  const sweep = goingLeft ? -1 : 1;

  return [
    `M ${startX} ${startY}`,
    `L ${startX} ${midY - radius}`,
    `Q ${startX} ${midY} ${startX + sweep * radius} ${midY}`,
    `L ${endX - sweep * radius} ${midY}`,
    `Q ${endX} ${midY} ${endX} ${midY + radius}`,
    `L ${endX} ${endY}`,
  ].join(' ');
}

function verticalPath(from: NodeBox, to: NodeBox): string {
  return `M ${from.badgeX} ${from.badgeY} L ${to.badgeX} ${to.badgeY}`;
}

export function DashbookingLandingBookingJourneyConnectors({
  boardElement,
  connectorIndex,
  settled,
  reducedMotion,
}: DashbookingLandingBookingJourneyConnectorsProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [boxes, setBoxes] = useState<NodeBox[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [boardSize, setBoardSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!boardElement) {
      return undefined;
    }

    const update = () => {
      setIsMobile(window.matchMedia('(max-width: 1023px)').matches);
      setBoxes(measure(boardElement));
      setBoardSize({ width: boardElement.clientWidth, height: boardElement.clientHeight });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(boardElement);
    window.addEventListener('resize', update);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [boardElement]);

  const paths = useMemo(() => {
    if (boxes.length < 7) {
      return [];
    }

    const [n1, n2, n3, n4, n5, n6, n7] = boxes;
    if (!n1 || !n2 || !n3 || !n4 || !n5 || !n6 || !n7) {
      return [];
    }

    if (isMobile) {
      return [verticalPath(n1, n2), verticalPath(n2, n3), verticalPath(n3, n4), verticalPath(n4, n5), verticalPath(n5, n6), verticalPath(n6, n7)];
    }

    return [
      horizontalPath(n1, n2),
      horizontalPath(n2, n3),
      horizontalPath(n3, n4),
      dropPath(n4, n5),
      horizontalPath(n5, n6),
      horizontalPath(n6, n7),
    ];
  }, [boxes, isMobile]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || reducedMotion) {
      return undefined;
    }

    const drawn = svg.querySelectorAll<SVGPathElement>('.booking-journey__path');
    const tweens: gsap.core.Tween[] = [];

    drawn.forEach((path, index) => {
      const shouldDraw = settled || index <= connectorIndex;
      if (shouldDraw && index === connectorIndex) {
        tweens.push(
          gsap.fromTo(
            path,
            { strokeDashoffset: 1, opacity: 1 },
            { strokeDashoffset: 0, opacity: 1, duration: 0.48, ease: 'power2.out' },
          ),
        );
        return;
      }

      gsap.set(path, {
        strokeDashoffset: shouldDraw ? 0 : 1,
        opacity: shouldDraw ? 1 : 0,
      });
    });

    return () => {
      tweens.forEach((tween) => tween.kill());
    };
  }, [connectorIndex, paths, reducedMotion, settled]);

  if (paths.length === 0 || boardSize.width === 0 || boardSize.height === 0) {
    return null;
  }

  return (
    <svg
      ref={svgRef}
      className="booking-journey__connectors"
      viewBox={`0 0 ${boardSize.width} ${boardSize.height}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="booking-journey-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#27c7be" />
          <stop offset="100%" stopColor="#078fa8" />
        </linearGradient>
        <marker
          id="booking-journey-arrow"
          markerUnits="userSpaceOnUse"
          markerWidth={ARROW}
          markerHeight={ARROW}
          refX="10"
          refY="6"
          orient="auto"
        >
          <path d="M0,1 L11,6 L0,11 Z" fill="#078fa8" />
        </marker>
        <marker
          id="booking-journey-arrow-track"
          markerUnits="userSpaceOnUse"
          markerWidth={ARROW}
          markerHeight={ARROW}
          refX="10"
          refY="6"
          orient="auto"
        >
          <path d="M0,1 L11,6 L0,11 Z" fill="rgba(7, 143, 168, 0.38)" />
        </marker>
      </defs>
      {paths.map((d, index) => {
        const drawn = settled || reducedMotion || index <= connectorIndex;

        return (
          <g key={`journey-path-${index}`}>
            <path
              className="booking-journey__path-track"
              d={d}
              pathLength={1}
              strokeWidth={STROKE}
              markerEnd={isMobile ? undefined : 'url(#booking-journey-arrow-track)'}
            />
            <path
              className={drawn ? 'booking-journey__path is-drawn' : 'booking-journey__path'}
              d={d}
              pathLength={1}
              strokeWidth={STROKE}
              markerEnd={isMobile ? undefined : 'url(#booking-journey-arrow)'}
            />
          </g>
        );
      })}
    </svg>
  );
}
