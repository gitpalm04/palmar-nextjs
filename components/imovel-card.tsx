import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bed, Bath, Car, Maximize } from 'lucide-react'
import { ImovelCompleto } from '@/lib/db'

interface ImovelCardProps {
  imovel: ImovelCompleto
}

const tipoLabels: Record<string, string> = {
  apartamento: 'Apartamento',
  casa: 'Casa',
  terreno: 'Terreno',
  comercial: 'Comercial',
  cobertura: 'Cobertura',
}

const statusLabels: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  disponivel: { label: 'Disponível', variant: 'default' },
  vendido: { label: 'Vendido', variant: 'destructive' },
  reservado: { label: 'Reservado', variant: 'secondary' },
  em_construcao: { label: 'Em Construção', variant: 'outline' },
}

export function ImovelCard({ imovel }: ImovelCardProps) {
  const statusInfo = statusLabels[imovel.status] || statusLabels.disponivel

  return (
    <Link href={`/imoveis/${imovel.slug}`}>
      <Card className="overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-4/3 overflow-hidden">
          {imovel.imagem_principal ? (
            <Image
              src={imovel.imagem_principal}
              alt={imovel.titulo}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">Sem imagem</span>
            </div>
          )}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant={statusInfo.variant} className="text-xs">
              {statusInfo.label}
            </Badge>
            {imovel.destaque && (
              <Badge variant="secondary" className="text-xs bg-accent text-accent-foreground">
                Destaque
              </Badge>
            )}
          </div>
        </div>
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            {tipoLabels[imovel.tipo]} {imovel.bairro && `• ${imovel.bairro}`}
          </p>
          <h3 className="font-semibold text-lg text-foreground leading-tight mb-2 line-clamp-1 text-balance">
            {imovel.titulo}
          </h3>
          {imovel.cidade && (
            <p className="text-sm text-muted-foreground mb-3">
              {imovel.cidade}, {imovel.estado}
            </p>
          )}
          
          {imovel.tipo !== 'terreno' && (
            <div className="flex gap-4 text-sm text-muted-foreground mb-3">
              {imovel.quartos > 0 && (
                <span className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  {imovel.quartos}
                </span>
              )}
              {imovel.banheiros > 0 && (
                <span className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  {imovel.banheiros}
                </span>
              )}
              {imovel.vagas > 0 && (
                <span className="flex items-center gap-1">
                  <Car className="h-4 w-4" />
                  {imovel.vagas}
                </span>
              )}
              {imovel.area_construida && (
                <span className="flex items-center gap-1">
                  <Maximize className="h-4 w-4" />
                  {imovel.area_construida}m²
                </span>
              )}
            </div>
          )}
          
          {imovel.preco && (
            <p className="text-xl font-bold text-primary">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                maximumFractionDigits: 0,
              }).format(imovel.preco)}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
