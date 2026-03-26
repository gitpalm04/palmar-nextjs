import { NextResponse } from 'next/server'
import { getImoveis, createImovel } from '@/lib/imoveis'
import { getSession } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const busca = searchParams.get('busca') || undefined
    const tipo = searchParams.get('tipo') || undefined
    const limit = parseInt(searchParams.get('limit') || '12')
    const page = parseInt(searchParams.get('page') || '1')
    const offset = (page - 1) * limit

    const { imoveis, total } = await getImoveis({ busca, tipo, limit, offset })

    return NextResponse.json({
      imoveis,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('GET imoveis error:', error)
    const isConnectionError = error instanceof Error && error.message.includes('ECONNREFUSED')
    return NextResponse.json(
      { 
        error: isConnectionError 
          ? 'Não foi possível conectar ao banco de dados. Verifique as variáveis de ambiente MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER e MYSQL_PASSWORD.'
          : 'Erro ao buscar imóveis' 
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const data = await request.json()
    const imovelId = await createImovel({
      ...data,
      created_by: session.userId,
    })

    return NextResponse.json({ success: true, id: imovelId }, { status: 201 })
  } catch (error) {
    console.error('POST imovel error:', error)
    return NextResponse.json(
      { error: 'Erro ao criar imóvel' },
      { status: 500 }
    )
  }
}
