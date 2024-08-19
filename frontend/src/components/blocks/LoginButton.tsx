import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGoogleLogin } from '@react-oauth/google'
import AuthService from '../../services/AuthService'
import { useState } from 'react'
import LoadingEffect from '../effects/LoadingEffect'

export default function LoginButton() {

    const [loading, setLoading] = useState<boolean>(false)

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                await AuthService.doGoogleAuth(response.access_token)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        },
        onError: (err) => {
            console.log(err)
        }
    })

    if (loading) {
        return <LoadingEffect />
    }

    return (
        <FontAwesomeIcon    icon={ faGoogle }
                            onClick={ () => {
                                setLoading(true)
                                handleGoogleLogin()
                            }}
                            size='lg'
                            className='border border-black rounded-md mt-6 p-2 cursor-pointer'
        />
    )
}
