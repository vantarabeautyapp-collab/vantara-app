import AuthGuard from '@/components/AuthGuard'

/**
 * Customer layout — every page under (customer)/ requires authentication.
 * AuthGuard reads the session from localStorage and redirects to /login
 * if no valid token is found.
 */
export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requiredRole="customer">
      {children}
    </AuthGuard>
  )
}
