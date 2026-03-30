'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { 
  Building2, 
  LayoutDashboard, 
  Home,
  LogOut,
  Plus,
  Users,
  PackageOpen
} from 'lucide-react'


interface AdminSidebarProps {
  user: {
    name: string
    email: string
    role: string
  }
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/imoveis', label: 'Imóveis', icon: Building2 },
  { href: '/admin/imoveis/novo', label: 'Novo Imóvel', icon: Plus },
  { href: '/admin/usuarios', label: 'Usuários', icon: Users, adminOnly: true },
]

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="p-2 bg-sidebar-primary rounded-lg">
            <PackageOpen  className="h-6 w-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold">Painel Admin</h1>
          </div>
        </Link>
      </div>

      {/* Navegação */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          if (item.adminOnly && user.role !== 'admin') return null
          
          const isActive = item.href === '/admin' 
            ? pathname === '/admin'
            : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Rodapé */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="mb-4 px-4">
          <p className="font-medium truncate">{user.name}</p>
          <p className="text-xs text-sidebar-foreground/70 truncate">{user.email}</p>
          <p className="text-xs text-sidebar-primary capitalize">{user.role}</p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent"
            asChild
          >
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Site
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>
    </aside>
  )
}
