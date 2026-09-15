import { cookies } from 'next/headers'

export interface AuthUser {
  id: string
  name: string
  email: string
  createdAt?: string
}

// In-memory user store for demo/development when database user table is not yet migrated
const registeredUsers: Map<string, { id: string; name: string; email: string; passwordHash: string }> = new Map([
  [
    'demo@aiorbit.club',
    {
      id: 'usr_demo',
      name: 'Demo Researcher',
      email: 'demo@aiorbit.club',
      passwordHash: 'password123',
    },
  ],
])

const activeSessions: Map<string, AuthUser> = new Map([
  [
    'demo_session_token',
    {
      id: 'usr_demo',
      name: 'Demo Researcher',
      email: 'demo@aiorbit.club',
    },
  ],
])

export function findUserByEmail(email: string) {
  return registeredUsers.get(email.toLowerCase().trim())
}

export function registerUser(name: string, email: string, password: string): AuthUser {
  const normalizedEmail = email.toLowerCase().trim()
  if (registeredUsers.has(normalizedEmail)) {
    throw new Error('An account with this email address already exists.')
  }

  const id = `usr_${Date.now()}`
  const user = {
    id,
    name: name.trim(),
    email: normalizedEmail,
    passwordHash: password, // In production this would use bcrypt/argon2
  }

  registeredUsers.set(normalizedEmail, user)
  return { id: user.id, name: user.name, email: user.email }
}

export function createSession(user: AuthUser): string {
  const token = `sess_${user.id}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  activeSessions.set(token, user)
  return token
}

export function getSessionUser(token: string): AuthUser | null {
  return activeSessions.get(token) || null
}

export function deleteSession(token: string) {
  activeSessions.delete(token)
}

export function getCurrentUser(): AuthUser | null {
  const cookieStore = cookies()
  const token = cookieStore.get('ai_orbit_session')?.value
  if (!token) return null
  return getSessionUser(token)
}
