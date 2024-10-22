import { env } from '@/env'

const api = (path: string, init?: RequestInit) => {
    const baseURL = env.NEXT_PUBLIC_API_BASE_URL
    const apiPrefix = '/api'
    const url = new URL(apiPrefix + path, baseURL)


    return fetch(url, init)
}

export default api