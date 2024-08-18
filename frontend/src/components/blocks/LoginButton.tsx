import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGoogleLogin } from '@react-oauth/google'
import AuthService from '../../services/AuthService'

export default function LoginButton() {

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                await AuthService.doGoogleAuth(response.access_token)
            } catch (err) {
                console.log(err)
            }
        },
        onError: (err) => {
            console.log(err)
        }
    })


    return (
        <FontAwesomeIcon    icon={ faGoogle }
                            onClick={ () => handleGoogleLogin()}
                            size='lg'
                            className='border border-black rounded-md mt-6 p-2 cursor-pointer'
        />
    )
}
