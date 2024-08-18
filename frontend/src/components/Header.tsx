import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Sidebar from './blocks/Sidebar'

export default function Header({ currentTab }: Readonly<{ currentTab: string }>) {

    const [sidebarActive, setSidebarActive] = useState<boolean>(false)

    if (sidebarActive) {
        return <Sidebar
            sidebarActive={ sidebarActive }
            setSidebarActive={ setSidebarActive }
        />
    }

    return (
        <>
            <Sidebar
                sidebarActive={ sidebarActive }
                setSidebarActive={ setSidebarActive }
            />
            <header className='shadow-md rounded-xl bg-white min-h-[50px] w-screen tracking-wide z-50 top-0 left-0 right-0 mb-10'>
                <div className='container mx-auto px-4 sm:px-10 py-4'>
                    <div className='flex items-center justify-between w-full'>
                        <Link to='/'><img src='' /></Link>

                        <div className='font-bold text-xl'>{ currentTab }</div>

                        <FontAwesomeIcon icon={ faBars } className='cursor-pointer'
                            onClick={ () => setSidebarActive(!sidebarActive) } />
                    </div>
                </div>
            </header>
        </>
    )
}
