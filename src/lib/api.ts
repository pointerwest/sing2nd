export function getPublicEnv() {
  return {
    projectName: process.env.PROJECT_NAME || 'Sing2nd',
    userFirstName: process.env.USER_FIRST_NAME || 'Sean',
    vercelUrl: process.env.VERCEL_URL || '',
    supabaseUrl: process.env.SUPABASE_URL || '',
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(path, { cache: 'no-store' })
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }
  return response.json() as Promise<T>
}
