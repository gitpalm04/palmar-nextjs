import Link from 'next/link'
import Image from 'next/image'
import { AdminWrapper } from '@/components/admin/admin-wrapper'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Pencil, Eye } from 'lucide-react'
import { getImoveisAdmin } from '@/lib/imoveis'
import { DeleteImovelButton } from '@/components/admin/delete-imovel-button'

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

export default async function AdminImoveisPage() {
  const { imoveis, total } = await getImoveisAdmin({ limit: 50 })

  return (
    <AdminWrapper>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Imóveis</h1>
            <p className="text-muted-foreground">
              {total} {total === 1 ? 'imóvel cadastrado' : 'imóveis cadastrados'}
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/imoveis/novo">
              <Plus className="h-4 w-4 mr-2" />
              Novo Imóvel
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Imóveis</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Imagem</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Cidade</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {imoveis.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Nenhum imóvel cadastrado
                    </TableCell>
                  </TableRow>
                ) : (
                  imoveis.map((imovel) => {
                    const statusInfo = statusLabels[imovel.status] || statusLabels.disponivel
                    return (
                      <TableRow key={imovel.id}>
                        <TableCell>
                          {imovel.imagem_principal ? (
                            <div className="relative w-16 h-12 rounded overflow-hidden">
                              <Image
                                src={imovel.imagem_principal}
                                alt={imovel.titulo}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-12 bg-muted rounded flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">Sem img</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{imovel.titulo}</p>
                            <p className="text-xs text-muted-foreground">
                              #{imovel.id.toString().padStart(6, '0')}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{tipoLabels[imovel.tipo]}</TableCell>
                        <TableCell>{imovel.cidade || '-'}</TableCell>
                        <TableCell>
                          {imovel.preco
                            ? new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                                maximumFractionDigits: 0,
                              }).format(imovel.preco)
                            : '-'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusInfo.variant}>
                            {statusInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/imoveis/${imovel.slug}`} target="_blank">
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/admin/imoveis/${imovel.id}`}>
                                <Pencil className="h-4 w-4" />
                              </Link>
                            </Button>
                            <DeleteImovelButton id={imovel.id} titulo={imovel.titulo} />
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminWrapper>
  )
}
