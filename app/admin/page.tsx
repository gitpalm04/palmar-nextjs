import { AdminWrapper } from '@/components/admin/admin-wrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, CheckCircle, Clock, DollarSign } from 'lucide-react'
import pool from '@/lib/db'
import { RowDataPacket } from 'mysql2'

async function getStats() {
  try {
    const [totalResult] = await pool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as total FROM imoveis'
    )
    const [disponivelResult] = await pool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as total FROM imoveis WHERE status = "disponivel"'
    )
    const [reservadoResult] = await pool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as total FROM imoveis WHERE status = "reservado"'
    )
    const [valorResult] = await pool.query<RowDataPacket[]>(
      'SELECT SUM(preco) as total FROM imoveis WHERE status = "disponivel"'
    )

    return {
      total: totalResult[0].total || 0,
      disponiveis: disponivelResult[0].total || 0,
      reservados: reservadoResult[0].total || 0,
      valorTotal: valorResult[0].total || 0,
    }
  } catch {
    return { total: 0, disponiveis: 0, reservados: 0, valorTotal: 0 }
  }
}

export default async function AdminDashboardPage() {
  const stats = await getStats()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <AdminWrapper>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral dos imóveis cadastrados
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Imóveis
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                imóveis cadastrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Disponíveis
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.disponiveis}</div>
              <p className="text-xs text-muted-foreground">
                prontos para venda
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Reservados
              </CardTitle>
              <Clock className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.reservados}</div>
              <p className="text-xs text-muted-foreground">
                em negociação
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Valor em Estoque
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(stats.valorTotal)}
              </div>
              <p className="text-xs text-muted-foreground">
                em imóveis disponíveis
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminWrapper>
  )
}
