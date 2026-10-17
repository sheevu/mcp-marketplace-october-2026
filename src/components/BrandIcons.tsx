import React from "react";

/**
 * Modern, official, high-resolution SVG Brand Icons for AI Clients & MCP Services
 */

export function CursorIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 3L10.5 21L13.5 13.5L21 10.5L3 3Z"
        fill="url(#cursor-grad)"
        stroke="#38bdf8"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M13.5 13.5L20 20" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
      <defs>
        <linearGradient id="cursor-grad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0284c7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ClaudeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L14.5 8.5L21 11L14.5 13.5L12 20L9.5 13.5L3 11L9.5 8.5L12 2Z"
        fill="url(#claude-grad)"
      />
      <circle cx="12" cy="11" r="2.5" fill="#fef3c7" />
      <defs>
        <linearGradient id="claude-grad" x1="3" y1="2" x2="21" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f97316" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function VsCodeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.5 2L7 11.5L2.5 8L1 9.5L5.5 13.5L1 17.5L2.5 19L7 15.5L17.5 24L23 21V3L17.5 2ZM17.5 18L10 13.5L17.5 9V18Z"
        fill="url(#vscode-grad)"
      />
      <defs>
        <linearGradient id="vscode-grad" x1="1" y1="2" x2="23" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#007acc" />
          <stop offset="0.5" stopColor="#0098ff" />
          <stop offset="1" stopColor="#0066b8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function GitHubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export function SupabaseIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.25 2L3 14.5H11.5L10.75 22L21 9.5H12.5L13.25 2Z"
        fill="url(#supabase-grad)"
      />
      <defs>
        <linearGradient id="supabase-grad" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3ecf8e" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.52 3.48A11.9 11.9 0 0012.06 0C5.46 0 .09 5.37.09 11.97c0 2.11.55 4.16 1.6 5.98L0 24l6.23-1.63a11.94 11.94 0 005.83 1.51h.01c6.6 0 11.97-5.37 11.97-11.97 0-3.2-.12-6.22-3.52-8.43z"
        fill="#25D366"
      />
      <path
        d="M17.5 14.37c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.22-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.24-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.51s1.08 2.92 1.23 3.12c.15.2 2.11 3.23 5.12 4.53.72.31 1.28.5 1.71.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.31.18-1.43-.08-.13-.28-.2-.58-.35z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function VercelIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1L24 22H0L12 1Z" />
    </svg>
  );
}

export function SudarshanChakraIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" stroke="url(#chakra-ring)" strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="16" cy="16" r="9" stroke="#06b6d4" strokeWidth="1" opacity="0.6" />
      <circle cx="16" cy="16" r="4.5" fill="url(#chakra-core)" />
      {/* 8 Energy spokes of Sudarshan */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1="16"
          y1="16"
          x2={16 + 13 * Math.cos((angle * Math.PI) / 180)}
          y2={16 + 13 * Math.sin((angle * Math.PI) / 180)}
          stroke="url(#chakra-spoke)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}
      <defs>
        <linearGradient id="chakra-ring" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a855f7" />
          <stop offset="0.5" stopColor="#06b6d4" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="chakra-core" x1="11.5" y1="11.5" x2="20.5" y2="20.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a855f7" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="chakra-spoke" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#c084fc" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
    </svg>
  );
}
