import { ApiResponse } from '../responses/ApiResponse'
import { UserResponse } from '../responses/UsersResponses'
import { request } from '../utils/axios_helper'

class UserService {
    async getUser(id: string): Promise<ApiResponse<UserResponse>> {
        try {
            return await request<UserResponse>(
                'GET',
                `/users/${id}`
            )
        } catch (err) {
            console.log(err)
            throw err
        }
    }
    
    async updateUser(id: string, field: Partial<UserResponse>): Promise<ApiResponse<UserResponse>> {
        try {
            return await request<UserResponse>(
                'PATCH',
                `/users/${id}`,
                field
            )
        } catch (err) {
            console.log(err)
            throw err
        }
    }
}

export default new UserService()