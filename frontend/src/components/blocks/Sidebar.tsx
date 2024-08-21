import { useEffect, useState } from 'react'
import AuthService from '../../services/AuthService'
import { SidebarProps } from '../../props/SidebarProps'
import { ArrowUpLeft } from 'lucide-react'
import { Separator } from '../ui/separator'
import NavSidebarButton from './NavSidebarButton'

export default function Sidebar({ sidebarActive, setSidebarActive }: Readonly<SidebarProps>) {

    const isAuthenticated = AuthService.isAuthenticated()

    const [authUserId, setAuthUserId] = useState<string>('')

    useEffect(() => {
        if (isAuthenticated) {
            setAuthUserId(AuthService.getAuthUserId())
        }
    }, [isAuthenticated])
    
    return (
        <div className={ `pb-12 pt-12 pl-6 pr-6 sidebar ${sidebarActive ? 'active' : ''}` }>
            <div className='flex justify-end'>
                <ArrowUpLeft onClick={ () => setSidebarActive(false) } />
            </div>
            <div className='space-y-4 py-4'>
                <div className='px-4 py-2'>
                    <h2 className='mb-2 px-2 text-xl font-semibold tracking-tight'>
                        Eng Board
                    </h2>
                    <div className='space-y-1'>
                        <NavSidebarButton 
                            link='/'
                            buttonName='Home'
                            setSidebarActive={ setSidebarActive }
                        />
                        { !isAuthenticated &&
                            <NavSidebarButton
                                link='/auth'
                                buttonName='Login'
                                setSidebarActive={ setSidebarActive }
                            />
                        }

                        { isAuthenticated &&
                            <>
                                <NavSidebarButton
                                    link={ `/users/${ authUserId }` }
                                    buttonName='Profile'
                                    setSidebarActive={ setSidebarActive }
                                />
                                <div onClick={ async () => await AuthService.logout() }>
                                    <NavSidebarButton
                                        link='/'
                                        buttonName='Logout'
                                        setSidebarActive={ setSidebarActive }
                                    />
                                </div>
                            </>
                        }
                    </div>
                </div>
                <Separator />
            </div>
        </div>
    )
}