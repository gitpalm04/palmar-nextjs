'use client'

import { useState, useEffect, useCallback } from 'react'
import { ImovelCard } from './imovel-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Building2, Home, TreePine, Store, Building } from 'lucide-react'
import { ImovelCompleto } from '@/lib/db'

const tipos = [
  { value: '', label: 'Todos', icon: Building2 },
  // { value: 'apartamento', label: 'Apartamentos', icon: Building },
  { value: 'casa', label: 'Casas', icon: Home },
  { value: 'terreno', label: 'Terrenos', icon: TreePine },
  { value: 'comercial', label: 'Comercial', icon: Store },
  // { value: 'cobertura', label: 'Coberturas', icon: Building },
]

interface ImoveisData {
  imoveis: ImovelCompleto[]
  total: number
  page: number
  totalPages: number
}

export function ImoveisList() {
  const [data, setData] = useState<ImoveisData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [busca, setBusca] = useState('')
  const [tipo, setTipo] = useState('')
  const [page, setPage] = useState(1)

  const fetchImoveis = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (busca) params.set('busca', busca)
      if (tipo) params.set('tipo', tipo)
      params.set('page', page.toString())
      params.set('limit', '12')

      const response = await fetch(`/api/imoveis?${params}`)
      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Erro ao carregar imóveis')
        setData({ imoveis: [], total: 0, page: 1, totalPages: 1 })
      } else {
        setData(result)
      }
    } catch (err) {
      console.error('Erro ao buscar imóveis:', err)
      setError('Erro de conexão. Verifique o servidor.')
      setData({ imoveis: [], total: 0, page: 1, totalPages: 1 })
    } finally {
      setLoading(false)
    }
  }, [busca, tipo, page])

  useEffect(() => {
    fetchImoveis()
  }, [fetchImoveis])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    fetchImoveis()
  }

  const handleTipoChange = (newTipo: string) => {
    setTipo(newTipo)
    setPage(1)
  }

  return (
    <div className="space-y-8">
      
      {/* BUSCA */}
      <div className="space-y-4">
        {/* <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar por título, cidade ou bairro..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10 shadow-md border-none"
            />
          </div>
          <Button type="submit">Buscar</Button>
        </form> */}

        {/* FILTROS */}
        <div className="flex flex-wrap justify-center gap-2">
          {tipos.map(({ value, label, icon: Icon }) => (
            <Button
              key={value}
              variant={tipo === value ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTipoChange(value)}
              className="gap-2 shadow-md border-none"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>

      /* ERRO */
      ) : error ? (
        <div className="text-center py-12">
          <Building2 className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-semibold mb-2">Erro ao carregar imóveis</h3>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={fetchImoveis} variant="outline" className="mt-4">
            Tentar novamente
          </Button>
        </div>

      /* VAZIO */
      ) : data?.imoveis?.length === 0 ? (
        <div className="text-center py-12">
          <Building2 className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-semibold mb-2">Nenhum imóvel encontrado</h3>
          <p className="text-muted-foreground">
            Tente ajustar os filtros ou a busca.
          </p>
        </div>

      /* LISTA */
      ) : (
        <>
          <p className="text-center text-muted-foreground">
            {data?.total} {data?.total === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {data?.imoveis?.map((imovel) => (
              <ImovelCard key={imovel.id} imovel={imovel} />
            ))}
          </div>

          {/* PAGINAÇÃO */}
          {data && data.totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-8">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Anterior
              </Button>

              <span className="flex items-center px-4 text-sm text-muted-foreground">
                Página {page} de {data.totalPages}
              </span>

              <Button
                variant="outline"
                disabled={page === data.totalPages}
                onClick={() => setPage(page + 1)}
              >
                Próximo
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}