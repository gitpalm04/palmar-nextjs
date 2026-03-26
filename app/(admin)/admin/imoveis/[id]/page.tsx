import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AdminWrapper } from '@/components/admin/admin-wrapper'
import { ImovelForm } from '@/components/admin/imovel-form'
import { getImovelById } from '@/lib/imoveis'
import { ArrowLeft } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditarImovelPage({ params }: PageProps) {
  const { id } = await params
  const imovel = await getImovelById(parseInt(id))

  if (!imovel) {
    notFound()
  }

  return (
    <AdminWrapper>
      <div className="p-8 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/admin/imoveis"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <h1 className="text-3xl font-bold">Editar Imóvel</h1>
          <p className="text-muted-foreground">
            #{imovel.id.toString().padStart(6, '0')} - {imovel.titulo}
          </p>
        </div>

        <ImovelForm imovel={imovel} />
      </div>
    </AdminWrapper>
  )
}
