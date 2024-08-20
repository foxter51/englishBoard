import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserResponse } from '../responses/UsersResponses'
import UserService from '../services/UserService'
import LoadingEffect from '../components/effects/LoadingEffect'
import Avatar from 'react-avatar'
import AuthService from '../services/AuthService'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'
import UserDetailsPopover from '../components/blocks/UserDetailsPopover'

export default function UserPage() {

    const [user, setUser] = useState<UserResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<null | string>(null)

    const { id } = useParams()
    const isSelf = id === AuthService.getAuthUserId()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await UserService.getUser(id!)
                setUser(response.data)
            } catch (err) {
                setError(err.response.data.error)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [id])

    if (error) {
        return <div>{ error }</div>
    }

    if (loading) {
        return <LoadingEffect/>
    }
    
    return (
        <div className='grid grid-rows-3 gap-4'>
            <div className='flex flex-row items-center mb-5'>
                { user?.avatar &&
                    <img className='w-10 h-10 rounded-full me-2' src={ user?.avatar } alt={ user?.name }></img>
                }
                { !user?.avatar &&
                    <Avatar className='rounded-full me-2' name={ user?.name } size='40' />
                }
                <div className='text-2xl font-bold'>{ user?.name }</div>
            </div>

            <div className='flex flex-row justify-center'>
                <div className='text-xl font-bold'>Learnt: { user?.learnt_cards_count }  |  To Learn : { user?.to_learn_cards_count }</div>
            </div>

            { isSelf &&
                <div className='flex flex-row justify-center'>
                    <Popover>
                        <PopoverTrigger className='cursor-pointer bg-white border border-black max-w-44'>
                            My personal info
                        </PopoverTrigger>
                        <PopoverContent>
                            <UserDetailsPopover
                                user={ user! }
                                setUser={ setUser }
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            }
        </div>
    )
}
