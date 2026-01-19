'use client'
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react" // Added Suspense
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

// 1. Move the URL tracking logic into its own small component
function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      posthog.capture('$pageview', { '$current_url': url })
    }
  }, [pathname, searchParams])

  return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      defaults: '2025-11-30',
      capture_pageview: false,
      capture_screenview: false
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      {/* 2. Wrap the tracker in Suspense */}
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  )
}
