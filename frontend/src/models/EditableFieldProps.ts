import { UserResponse } from '../responses/UsersResponses'

export interface EditableFieldProps {
    type: 'text' | 'password' | 'email'
    placeholder: string
    label: string
    field: string
    user: UserResponse
    setUser: (user: UserResponse) => void
    minLength?: number
    maxLength?: number
}