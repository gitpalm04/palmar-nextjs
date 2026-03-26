import Link from 'next/link'
import { AdminWrapper } from '@/components/admin/admin-wrapper'
import { ImovelForm } from '@/components/admin/imovel-form'
import { ArrowLeft } from 'lucide-react'

export default function NovoImovelPage() {
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
          <h1 className="text-3xl font-bold">Novo Imóvel</h1>
          <p className="text-muted-foreground">
            Preencha os dados para cadastrar um novo imóvel
          </p>
        </div>

        <ImovelForm />
      </div>
    </AdminWrapper>
  )
}
