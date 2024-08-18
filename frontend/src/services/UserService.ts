import { UserResponse } from '../responses/UsersResponses'
import { request } from '../utils/axios_helper'

class UserService {
    async getUser(id: string) {
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
}

export default new UserService()