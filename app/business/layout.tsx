import AuthGuard from '@/components/AuthGuard'

/**
 * Business layout — every page under /business/* requires a user with
 * role === 'business'.  Non-business users are redirected back to /login.
 */
export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requiredRole="business">
      {children}
    </AuthGuard>
  )
}
