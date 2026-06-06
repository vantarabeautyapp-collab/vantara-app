import AuthGuard from '@/components/AuthGuard'

/**
 * Admin layout — every page under /admin/* requires a user with
 * role === 'admin' or 'super_admin'.  All other users are bounced to /login.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requiredRole={['admin', 'super_admin']}>
      {children}
    </AuthGuard>
  )
}
