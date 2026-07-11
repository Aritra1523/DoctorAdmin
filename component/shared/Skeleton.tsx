"use client";

interface SkeletonProps {
  className?: string;
}

/**
 * Generic shimmering placeholder block.
 * Compose with width/height utility classes, e.g. <Skeleton className="h-4 w-24" />
 */
export const Skeleton = ({ className = "" }: SkeletonProps) => (
  <div className={`animate-pulse rounded-md bg-white/[0.07] ${className}`} />
);

export default Skeleton;
