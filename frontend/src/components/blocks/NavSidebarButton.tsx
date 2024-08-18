import { ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { NavSidebarButtonProps } from '../../models/NavSidebarButtonProps'

export default function NavSidebarButton({ link, buttonName, setSidebarActive }: Readonly<NavSidebarButtonProps>) {
    return (
        <div>
            <Link to={ `${link}` }>
                <Button
                    variant='secondary'
                    size='sm'
                    className='w-full justify-start'
                    onClick={ () => setSidebarActive(false) }
                >
                    <div className='flex w-full justify-between items-center'>
                        <div className='text-xl'>
                            { buttonName }
                        </div>
                        <ChevronRight />
                    </div>
                </Button>
            </Link>
        </div>
    )
}
