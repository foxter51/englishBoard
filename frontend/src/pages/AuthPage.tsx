import { Navigate } from 'react-router-dom'
import AuthService from '../services/AuthService'
import { useState } from 'react'
import classNames from 'classnames'
import LoginForm from '../components/forms/LoginForm'
import RegisterForm from '../components/forms/RegisterForm'

export default function AuthPage() {

    const [activeTab, setActiveTab] = useState<string>('login')
    
    if (AuthService.isAuthenticated()) {
        return <Navigate to='/' />
    }

    return (
        <div>
            <div className='flex mb-5 w-64 justify-between'>
                <div
                    className={ classNames(
                        'text-xl font-bold cursor-pointer',
                        activeTab === 'login' ?
                        'underline transition ease-in-out delay-15 hover:scale-110 duration-300'
                        :
                        'text-gray-500'
                    ) }
                    onClick={ () => setActiveTab('login') }
                >
                    Login
                </div>
                <div
                    className={ classNames(
                        'text-xl font-bold cursor-pointer',
                        activeTab === 'register' ?
                        'underline transition ease-in-out delay-150 hover:scale-110 duration-300'
                        :
                        'text-gray-500'
                    ) }
                    onClick={ () => setActiveTab('register') }
                >
                    Register
                </div>
            </div>
            <div className='mt-8'>
                <div className={ classNames(
                    activeTab === 'login' ?
                    'opacity-100' :
                    'opacity-0 hidden'
                ) }>
                    <LoginForm />
                </div>
                <div className={ classNames(
                    activeTab === 'register' ?
                    'opacity-100' :
                    'opacity-0 hidden'
                ) }>
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}
