// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// In-memory storage (consider using Redis for production)
const rateLimit = new Map()

export const config = {
  rateLimit: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10, // max requests per window
  },
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}

function isBot(userAgent: string | null): boolean {
  if (!userAgent) return true
  const botPatterns = [
    'bot', 'spider', 'crawler', 'phantom', 'headless',
    'selenium', 'puppeteer', 'chrome-lighthouse'
  ]
  return botPatterns.some(pattern => userAgent.toLowerCase().includes(pattern))
}

function rateLimitCheck(ip: string): boolean {
  const now = Date.now()
  const windowData = rateLimit.get(ip) || { count: 0, startTime: now }

  if (now - windowData.startTime > config.rateLimit.windowMs) {
    windowData.count = 1
    windowData.startTime = now
  } else {
    windowData.count++
  }

  rateLimit.set(ip, windowData)
  return windowData.count <= config.rateLimit.maxRequests
}

export async function middleware(request: NextRequest) {
  const ip = (request as any).ip ?? '127.0.0.1'
  const userAgent = request.headers.get('user-agent')

  // Basic security checks
  if (isBot(userAgent)) {
    return new NextResponse('Access Denied', { status: 403 })
  }

  // Rate limiting
  if (!rateLimitCheck(ip) && process.env.NODE_ENV === 'production') {
    return new NextResponse('Too Many Requests', { status: 429 })
  }

  const response = NextResponse.next()

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  return response
}