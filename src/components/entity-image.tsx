"use client";
import Image from "next/image";
import { useState } from "react";
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
export function EntityImage({
  src,
  alt,
  size = 56,
  rounded = false,
}: {
  src?: string;
  alt: string;
  size?: number;
  rounded?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const shape = rounded ? "rounded-full" : "rounded";
  if (!src || failed) {
    return (
      <div
        aria-hidden
        style={{ width: size, height: size }}
        className={`flex shrink-0 items-center justify-center border border-gray-800 bg-gray-900 font-semibold text-gray-500 ${shape}`}
      >
        <span style={{ fontSize: Math.round(size * 0.36) }}>{initials(alt)}</span>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      className={`shrink-0 bg-gray-900 ${rounded ? "object-cover" : "object-contain"} ${shape}`}
    />
  );
}