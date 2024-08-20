import { UserDetailsPopoverProps } from '../../models/UserDetailsPopoverProps';
import EditableUserField from './EditableUserField';

export default function UserDetailsPopover({ user, setUser }: Readonly<UserDetailsPopoverProps>) {
    
    return (
        <>
            <EditableUserField
                type='text'
                placeholder={ `${user?.name}` }
                label='Name'
                field='name'
                user={ user }
                setUser={ setUser }
                minLength={ 3 }
                maxLength={ 64 }
            />
            { user?.provider === 'email' &&
                <>
                    <EditableUserField
                        type='email'
                        placeholder={ `${user?.email}` }
                        label='Email'
                        field='email'
                        user={ user }
                        setUser={ setUser }
                    />
                    <EditableUserField
                        type='password'
                        placeholder=''
                        label='Password'
                        field='password'
                        user={ user }
                        setUser={ setUser }
                        minLength={ 6 }
                        maxLength={ 64 }
                    />
                </>
            }
            <EditableUserField
                type='text'
                placeholder='Enter prompt to generate avatar'
                label='Avatar'
                field='avatar'
                user={ user }
                setUser={ setUser }
            />
        </>
    )
}
