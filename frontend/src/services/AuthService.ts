import { AuthResponse } from '../responses/AuthResponses'
import { request } from '../utils/axios_helper'
import Cookies from 'js-cookie'

class AuthService {

    async login(email: string, password: string) {
        try {
            const response = await request<AuthResponse>(
                'POST',
                '/auth/login',
                {
                    email,
                    password
                }
            )
            this.setAuthUserId(response.data.user_id)
            this.setAuthToken(response.data.token)
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    async register(email: string, name: string, password: string) {
        try {
            const response = await request<AuthResponse>(
                'POST',
                '/auth/register',
                {
                    email,
                    name,
                    password
                }
            )
            this.setAuthUserId(response.data.user_id)
            this.setAuthToken(response.data.token)
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    async doGoogleAuth(token: string) {
        try {
            const response = await request<AuthResponse>(
                'POST',
                '/auth/google_oauth2/callback',
                { token }
            )
            this.setAuthUserId(response.data.user_id)
            this.setAuthToken(response.data.token)
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    async logout() {
        try {
            await request('GET', '/auth/logout')
        } catch(err) {
            console.log(err)
        } finally {
            Cookies.remove('auth_token')
            Cookies.remove('user_id')
            window.location.reload()
        }
    }

    getAuthToken(): string | undefined | null {
        return Cookies.get('auth_token')
    }

    setAuthToken(token: string) {
        Cookies.set('auth_token', token, { expires: 1, secure: false })
        window.location.reload()
    }

    getAuthUserId(): string {
        return Cookies.get('user_id')!
    }

    setAuthUserId(id: string) {
        Cookies.set('user_id', id, { expires: 1, secure: false })
    }

    isAuthenticated(): boolean {
        return this.getAuthToken() !== undefined && this.getAuthToken() !== null && this.getAuthToken() !== 'null'
    }
}

export default new AuthService()