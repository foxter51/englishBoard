import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EditableFieldProps } from '../../props/EditableFieldProps'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../ui/button'
import UserService from '../../services/UserService'
import { useRef, useState } from 'react'
import LoadingEffect from '../effects/LoadingEffect'

export default function EditableUserField({ type, placeholder, label, field, user, setUser, minLength, maxLength }: Readonly<EditableFieldProps>) {

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<null | string>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const onSubmitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setLoading(true)
            if (user[field] === inputRef.current?.value) {
                setError('Nothing to update')
                return
            }
            const response = await UserService.updateUser(
                user._id,
                { [field]: inputRef.current?.value }
            )
            setUser(response.data)
        } catch (err) {
            setError(err.response.data.error)
            setError(prev => err.response.data.errors ? err.response.data.errors : prev)
        } finally {
            setLoading(false)
        }
    }
    
    if (loading) {
        return <LoadingEffect/>
    }

    return (
        <form className='mb-1' onSubmit={ onSubmitUpdate }>
            <div className='grid grid-rows-2'>
                <Label htmlFor={ label }>{ label }</Label>
                <Label className='text-red-500 mb-1'>{ error }</Label>
            </div>
            <div className='flex flex-row items-center justify-between'>
                <Input  ref={ inputRef } type={ type } placeholder={ placeholder } id={ label }
                        minLength={ minLength } maxLength={ maxLength }
                        onChange={ () => setError(null) } className='w-72 me-2' />
                <Button type='submit'>
                    <FontAwesomeIcon icon={ faWandMagicSparkles } />
                </Button>
            </div>
        </form>
    )
}
