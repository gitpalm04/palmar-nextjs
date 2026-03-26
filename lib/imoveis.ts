import pool, { Imovel, ImovelImagem, ImovelCaracteristica, ImovelCompleto } from './db'
import { RowDataPacket, ResultSetHeader } from 'mysql2'

// Buscar todos os imóveis ativos com filtros
export async function getImoveis(params?: {
  busca?: string
  tipo?: string
  limit?: number
  offset?: number
}): Promise<{ imoveis: ImovelCompleto[]; total: number }> {
  const { busca, tipo, limit = 12, offset = 0 } = params || {}
  
  let whereClause = 'WHERE i.ativo = TRUE'
  const queryParams: (string | number)[] = []

  if (busca) {
    whereClause += ' AND (i.titulo LIKE ? OR i.descricao LIKE ? OR i.cidade LIKE ? OR i.bairro LIKE ?)'
    const searchTerm = `%${busca}%`
    queryParams.push(searchTerm, searchTerm, searchTerm, searchTerm)
  }

  if (tipo) {
    whereClause += ' AND i.tipo = ?'
    queryParams.push(tipo)
  }

  // Contar total
  const [countResult] = await pool.query<RowDataPacket[]>(
    `SELECT COUNT(*) as total FROM imoveis i ${whereClause}`,
    queryParams
  )
  const total = countResult[0].total as number

  // Buscar imóveis
  const [imoveis] = await pool.query<RowDataPacket[]>(
    `SELECT i.*, 
      (SELECT url FROM imovel_imagens WHERE imovel_id = i.id AND principal = TRUE LIMIT 1) as imagem_principal
     FROM imoveis i 
     ${whereClause}
     ORDER BY i.destaque DESC, i.created_at DESC
     LIMIT ? OFFSET ?`,
    [...queryParams, limit, offset]
  )

  // Buscar características para cada imóvel
  const imoveisCompletos: ImovelCompleto[] = await Promise.all(
    (imoveis as Imovel[]).map(async (imovel) => {
      const [caracteristicas] = await pool.query<RowDataPacket[]>(
        'SELECT caracteristica FROM imovel_caracteristicas WHERE imovel_id = ?',
        [imovel.id]
      )
      return {
        ...imovel,
        imagens: [],
        caracteristicas: (caracteristicas as ImovelCaracteristica[]).map(c => c.caracteristica),
      }
    })
  )

  return { imoveis: imoveisCompletos, total }
}

// Buscar imóvel por slug
export async function getImovelBySlug(slug: string): Promise<ImovelCompleto | null> {
  const [imoveis] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM imoveis WHERE slug = ? AND ativo = TRUE',
    [slug]
  )

  if (!imoveis.length) return null

  const imovel = imoveis[0] as Imovel

  // Buscar imagens
  const [imagens] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM imovel_imagens WHERE imovel_id = ? ORDER BY ordem',
    [imovel.id]
  )

  // Buscar características
  const [caracteristicas] = await pool.query<RowDataPacket[]>(
    'SELECT caracteristica FROM imovel_caracteristicas WHERE imovel_id = ?',
    [imovel.id]
  )

  return {
    ...imovel,
    imagens: imagens as ImovelImagem[],
    caracteristicas: (caracteristicas as ImovelCaracteristica[]).map(c => c.caracteristica),
    imagem_principal: (imagens as ImovelImagem[]).find(img => img.principal)?.url,
  }
}

// Buscar imóveis em destaque
export async function getImoveisDestaque(limit = 6): Promise<ImovelCompleto[]> {
  const { imoveis } = await getImoveis({ limit })
  return imoveis.filter(i => i.destaque)
}

// ==================== FUNÇÕES ADMIN ====================

// Buscar todos os imóveis (incluindo inativos) para admin
export async function getImoveisAdmin(params?: {
  busca?: string
  tipo?: string
  status?: string
  limit?: number
  offset?: number
}): Promise<{ imoveis: ImovelCompleto[]; total: number }> {
  const { busca, tipo, status, limit = 20, offset = 0 } = params || {}
  
  let whereClause = 'WHERE 1=1'
  const queryParams: (string | number)[] = []

  if (busca) {
    whereClause += ' AND (i.titulo LIKE ? OR i.cidade LIKE ?)'
    const searchTerm = `%${busca}%`
    queryParams.push(searchTerm, searchTerm)
  }

  if (tipo) {
    whereClause += ' AND i.tipo = ?'
    queryParams.push(tipo)
  }

  if (status) {
    whereClause += ' AND i.status = ?'
    queryParams.push(status)
  }

  const [countResult] = await pool.query<RowDataPacket[]>(
    `SELECT COUNT(*) as total FROM imoveis i ${whereClause}`,
    queryParams
  )
  const total = countResult[0].total as number

  const [imoveis] = await pool.query<RowDataPacket[]>(
    `SELECT i.*, 
      (SELECT url FROM imovel_imagens WHERE imovel_id = i.id AND principal = TRUE LIMIT 1) as imagem_principal
     FROM imoveis i 
     ${whereClause}
     ORDER BY i.created_at DESC
     LIMIT ? OFFSET ?`,
    [...queryParams, limit, offset]
  )

  return { 
    imoveis: (imoveis as Imovel[]).map(i => ({ ...i, imagens: [], caracteristicas: [] })), 
    total 
  }
}

// Buscar imóvel por ID (admin)
export async function getImovelById(id: number): Promise<ImovelCompleto | null> {
  const [imoveis] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM imoveis WHERE id = ?',
    [id]
  )

  if (!imoveis.length) return null

  const imovel = imoveis[0] as Imovel

  const [imagens] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM imovel_imagens WHERE imovel_id = ? ORDER BY ordem',
    [imovel.id]
  )

  const [caracteristicas] = await pool.query<RowDataPacket[]>(
    'SELECT caracteristica FROM imovel_caracteristicas WHERE imovel_id = ?',
    [imovel.id]
  )

  return {
    ...imovel,
    imagens: imagens as ImovelImagem[],
    caracteristicas: (caracteristicas as ImovelCaracteristica[]).map(c => c.caracteristica),
  }
}

// Criar imóvel
export async function createImovel(data: {
  titulo: string
  descricao?: string
  tipo: Imovel['tipo']
  status?: Imovel['status']
  preco?: number
  area_total?: number
  area_construida?: number
  quartos?: number
  suites?: number
  banheiros?: number
  vagas?: number
  endereco?: string
  bairro?: string
  cidade?: string
  estado?: string
  cep?: string
  destaque?: boolean
  ativo?: boolean
  created_by?: number
  imagens?: { url: string; alt?: string; principal?: boolean }[]
  caracteristicas?: string[]
}): Promise<number> {
  const slug = generateSlug(data.titulo)
  
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO imoveis (titulo, slug, descricao, tipo, status, preco, area_total, area_construida, 
      quartos, suites, banheiros, vagas, endereco, bairro, cidade, estado, cep, destaque, ativo, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.titulo,
      slug,
      data.descricao || null,
      data.tipo,
      data.status || 'disponivel',
      data.preco || null,
      data.area_total || null,
      data.area_construida || null,
      data.quartos || 0,
      data.suites || 0,
      data.banheiros || 0,
      data.vagas || 0,
      data.endereco || null,
      data.bairro || null,
      data.cidade || null,
      data.estado || null,
      data.cep || null,
      data.destaque || false,
      data.ativo !== false,
      data.created_by || null,
    ]
  )

  const imovelId = result.insertId

  // Inserir imagens
  if (data.imagens?.length) {
    for (let i = 0; i < data.imagens.length; i++) {
      const img = data.imagens[i]
      await pool.query(
        'INSERT INTO imovel_imagens (imovel_id, url, alt, ordem, principal) VALUES (?, ?, ?, ?, ?)',
        [imovelId, img.url, img.alt || null, i, img.principal || i === 0]
      )
    }
  }

  // Inserir características
  if (data.caracteristicas?.length) {
    for (const carac of data.caracteristicas) {
      await pool.query(
        'INSERT INTO imovel_caracteristicas (imovel_id, caracteristica) VALUES (?, ?)',
        [imovelId, carac]
      )
    }
  }

  return imovelId
}

// Atualizar imóvel
export async function updateImovel(id: number, data: {
  titulo?: string
  descricao?: string
  tipo?: Imovel['tipo']
  status?: Imovel['status']
  preco?: number | null
  area_total?: number | null
  area_construida?: number | null
  quartos?: number
  suites?: number
  banheiros?: number
  vagas?: number
  endereco?: string
  bairro?: string
  cidade?: string
  estado?: string
  cep?: string
  destaque?: boolean
  ativo?: boolean
  imagens?: { url: string; alt?: string; principal?: boolean }[]
  caracteristicas?: string[]
}): Promise<void> {
  const updates: string[] = []
  const values: (string | number | boolean | null)[] = []

  if (data.titulo !== undefined) {
    updates.push('titulo = ?', 'slug = ?')
    values.push(data.titulo, generateSlug(data.titulo))
  }
  if (data.descricao !== undefined) { updates.push('descricao = ?'); values.push(data.descricao) }
  if (data.tipo !== undefined) { updates.push('tipo = ?'); values.push(data.tipo) }
  if (data.status !== undefined) { updates.push('status = ?'); values.push(data.status) }
  if (data.preco !== undefined) { updates.push('preco = ?'); values.push(data.preco) }
  if (data.area_total !== undefined) { updates.push('area_total = ?'); values.push(data.area_total) }
  if (data.area_construida !== undefined) { updates.push('area_construida = ?'); values.push(data.area_construida) }
  if (data.quartos !== undefined) { updates.push('quartos = ?'); values.push(data.quartos) }
  if (data.suites !== undefined) { updates.push('suites = ?'); values.push(data.suites) }
  if (data.banheiros !== undefined) { updates.push('banheiros = ?'); values.push(data.banheiros) }
  if (data.vagas !== undefined) { updates.push('vagas = ?'); values.push(data.vagas) }
  if (data.endereco !== undefined) { updates.push('endereco = ?'); values.push(data.endereco) }
  if (data.bairro !== undefined) { updates.push('bairro = ?'); values.push(data.bairro) }
  if (data.cidade !== undefined) { updates.push('cidade = ?'); values.push(data.cidade) }
  if (data.estado !== undefined) { updates.push('estado = ?'); values.push(data.estado) }
  if (data.cep !== undefined) { updates.push('cep = ?'); values.push(data.cep) }
  if (data.destaque !== undefined) { updates.push('destaque = ?'); values.push(data.destaque) }
  if (data.ativo !== undefined) { updates.push('ativo = ?'); values.push(data.ativo) }

  if (updates.length > 0) {
    await pool.query(
      `UPDATE imoveis SET ${updates.join(', ')} WHERE id = ?`,
      [...values, id]
    )
  }

  // Atualizar imagens (deletar e reinserir)
  if (data.imagens !== undefined) {
    await pool.query('DELETE FROM imovel_imagens WHERE imovel_id = ?', [id])
    for (let i = 0; i < data.imagens.length; i++) {
      const img = data.imagens[i]
      await pool.query(
        'INSERT INTO imovel_imagens (imovel_id, url, alt, ordem, principal) VALUES (?, ?, ?, ?, ?)',
        [id, img.url, img.alt || null, i, img.principal || i === 0]
      )
    }
  }

  // Atualizar características
  if (data.caracteristicas !== undefined) {
    await pool.query('DELETE FROM imovel_caracteristicas WHERE imovel_id = ?', [id])
    for (const carac of data.caracteristicas) {
      await pool.query(
        'INSERT INTO imovel_caracteristicas (imovel_id, caracteristica) VALUES (?, ?)',
        [id, carac]
      )
    }
  }
}

// Deletar imóvel
export async function deleteImovel(id: number): Promise<void> {
  await pool.query('DELETE FROM imoveis WHERE id = ?', [id])
}

// Gerar slug a partir do título
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .concat('-', Date.now().toString(36))
}
