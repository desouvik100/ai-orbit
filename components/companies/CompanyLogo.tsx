'use client'

import React, { useState } from 'react'

interface CompanyLogoProps {
  name: string
  logo?: string | null
  size?: number
  className?: string
}

export function CompanyLogo({ name, logo, size = 36, className = '' }: CompanyLogoProps) {
  const [imgFailed, setImgFailed] = useState(false)

  const initials = name
    ? name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join('')
    : 'AI'

  const showFallback = !logo || imgFailed

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        minWidth: size,
        borderRadius: size > 48 ? 8 : 6,
        border: '1px solid #202025',
        backgroundColor: '#0a0a0d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {!showFallback ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={logo!}
          alt={`${name} logo`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={() => setImgFailed(true)}
          loading="lazy"
        />
      ) : (
        <span
          style={{
            fontSize: Math.max(10, Math.floor(size * 0.36)),
            fontWeight: 700,
            color: '#c4c4cb',
            letterSpacing: '-0.02em',
          }}
        >
          {initials}
        </span>
      )}
    </div>
  )
}
