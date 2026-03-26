import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import pool, { User } from './db'
import { RowDataPacket } from 'mysql2'

const secretKey = process.env.AUTH_SECRET || 'fallback-secret-key-change-in-production'
const key = new TextEncoder().encode(secretKey)

export interface SessionPayload {
  userId: number
  email: string
  name: string
  role: 'admin' | 'editor'
  expiresAt: Date
}

// Criar JWT token
export async function createToken(payload: Omit<SessionPayload, 'expiresAt'>): Promise<string> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 dias
  
  return new SignJWT({ ...payload, expiresAt: expiresAt.toISOString() })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key)
}

// Verificar e decodificar token
export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key)
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}

// Salvar sessão em cookie
export async function createSession(user: Pick<User, 'id' | 'email' | 'name' | 'role'>): Promise<void> {
  const token = await createToken({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })

  const cookieStore = await cookies()
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 dias
    path: '/',
  })
}

// Obter sessão atual
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  
  if (!token) return null
  
  return verifyToken(token)
}

// Destruir sessão
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

// Login de usuário
export async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const [users] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )

    if (!users.length) {
      return { success: false, error: 'Credenciais inválidas' }
    }

    const user = users[0] as User

    const passwordMatch = await bcrypt.compare(password, user.password_hash)
    if (!passwordMatch) {
      return { success: false, error: 'Credenciais inválidas' }
    }

    await createSession(user)
    return { success: true }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'Erro ao fazer login' }
  }
}

// Criar usuário
export async function createUser(data: {
  email: string
  password: string
  name: string
  role?: 'admin' | 'editor'
}): Promise<{ success: boolean; error?: string; userId?: number }> {
  try {
    // Verificar se email já existe
    const [existing] = await pool.query<RowDataPacket[]>(
      'SELECT id FROM users WHERE email = ?',
      [data.email]
    )

    if (existing.length) {
      return { success: false, error: 'Email já cadastrado' }
    }

    const passwordHash = await bcrypt.hash(data.password, 10)

    const [result] = await pool.query<RowDataPacket[]>(
      'INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)',
      [data.email, passwordHash, data.name, data.role || 'editor']
    )

    return { success: true, userId: (result as unknown as { insertId: number }).insertId }
  } catch (error) {
    console.error('Create user error:', error)
    return { success: false, error: 'Erro ao criar usuário' }
  }
}

// Verificar se é admin
export async function isAdmin(): Promise<boolean> {
  const session = await getSession()
  return session?.role === 'admin'
}

// Verificar se está autenticado
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return session !== null
}
