import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Painel Admin | Construtora',
  description: 'Painel administrativo para gerenciamento de imóveis',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
     <main className="flex-1">
          {children}
        </main>
  )
}
