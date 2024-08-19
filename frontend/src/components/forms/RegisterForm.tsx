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
import LoadingEffect from '../effects/LoadingEffect'

export default function RegisterForm() {
    const [fullName, setFullName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<null | string[]>(null)

    const onSubmitRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setLoading(true)
            await AuthService.register(email, fullName, password)
        } catch (err) {
            setError(err.response.data.errors)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <LoadingEffect />
    }

    return (
        <div>
            <Card>
                { error &&
                    <CardHeader>
                        <div className='max-w-48 flex-col flex gap-2'>
                            { error.map((err, i) =>
                                <div className='text-sm text-red-500' key={ i }>{ err }</div>
                            ) }
                        </div>
                    </CardHeader>
                }
                <CardContent className='mt-4'>
                    <form onSubmit={ onSubmitRegister }>
                        <Input  type='text' placeholder='Full Name' className='mb-4' onChange={ (e) => setFullName(e.target.value) }
                                minLength={ 3 } maxLength={ 64 }/>
                        <Input type='email' placeholder='Email' className='mb-4' onChange={ (e) => setEmail(e.target.value) }/>
                        <Input  type='password' placeholder='Password' className='mb-4' onChange={ (e) => setPassword(e.target.value) }
                                minLength={ 6 } maxLength={ 64 }/>
                        <Button type='submit' className='w-full'>Sign up</Button>
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
