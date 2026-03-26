import { NextResponse } from 'next/server'
import { getImovelById, updateImovel, deleteImovel } from '@/lib/imoveis'
import { getSession } from '@/lib/auth'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const imovel = await getImovelById(parseInt(id))

    if (!imovel) {
      return NextResponse.json({ error: 'Imóvel não encontrado' }, { status: 404 })
    }

    return NextResponse.json(imovel)
  } catch (error) {
    console.error('GET imovel error:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar imóvel' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { id } = await params
    const data = await request.json()
    
    await updateImovel(parseInt(id), data)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('PUT imovel error:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar imóvel' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { id } = await params
    await deleteImovel(parseInt(id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE imovel error:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar imóvel' },
      { status: 500 }
    )
  }
}
