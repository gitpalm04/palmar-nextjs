import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { AdminSidebar } from './admin-sidebar'

interface AdminWrapperProps {
  children: React.ReactNode
}

export async function AdminWrapper({ children }: AdminWrapperProps) {
  const session = await getSession()
  
  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar 
        user={{
          name: session.name,
          email: session.email,
          role: session.role,
        }} 
      />
      <main className="flex-1 bg-background overflow-auto">
        {children}
      </main>
    </div>
  )
}
