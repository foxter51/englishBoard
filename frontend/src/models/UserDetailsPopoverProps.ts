import { UserResponse } from '../responses/UsersResponses'

export interface UserDetailsPopoverProps {
    user: UserResponse
    setUser: (user: UserResponse) => void
}