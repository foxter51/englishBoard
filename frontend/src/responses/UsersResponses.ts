export interface UserResponse {
    [index: string]: string | number | undefined
    _id: string
    email: string
    name: string
    provider: string
    learnt_cards_count: number
    to_learn_cards_count: number
    avatar?: string
}