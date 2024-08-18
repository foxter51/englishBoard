import { FormEvent, useState } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../ui/card'
import { Input } from '../ui/input'
import AuthService from '../../services/AuthService'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import LoginButton from '../blocks/LoginButton'

export default function LoginForm() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<null | string>(null)

    const onSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await AuthService.login(email, password)
        } catch (err) {
            setError(err.response.data.error)
        }
    }
    
    return (
        <div>
            <Card>
                { error &&
                    <CardHeader>
                        <div className='text-sm text-red-500'>
                            { error }
                        </div>
                    </CardHeader>
                }
                <CardContent className='mt-4'>
                    <form onSubmit={ onSubmitLogin }>
                        <Input type='email' placeholder='Email' className='mb-4' onChange={ (e) => setEmail(e.target.value) }></Input>
                        <Input type='password' placeholder='Password' className='mb-4' onChange={ (e) => setPassword(e.target.value) }></Input>
                        <Button type='submit' className='w-full'>Log in</Button>
                    </form>
                </CardContent>
                <CardFooter className='flex flex-col items-center'>
                    <Separator title='OR' />
                    <LoginButton />
                </CardFooter>
            </Card>
        </div>
    )
}
