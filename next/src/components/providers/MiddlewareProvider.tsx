import React, { useEffect } from "react";
import { useCurrentUser } from "./UserProvider";
import { useRouter } from "next/router";



const adminPages = [
    '/admin',
]
const adminExcluded = [
    '/admin/login',
]
const protectedPages = [
    '/',
]
const protectedExcluded = [
    '/admin/login',
    '/register',
    '/admin'
]

const adminLogin = '/admin/login'
const login = '/admin/login'



const checkPaths = (array: string[], item: string) => {
    let match = array.find((path) => {
        return item.includes(path)
    })

    return Boolean(match)
}



const MiddlewareProvider = ({ children }: { children: JSX.Element }) => {
    let loadingReturn = (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="loader" />
        </div>
    )

    const [protectedChildren, setProtectedChildren] = React.useState<JSX.Element>(loadingReturn)
    
    let session = useCurrentUser()
    let router = useRouter()
    
    // Middleware
    useEffect(() => {
        // Si pas connecté et que la page est protégée
        if (session.status === 'unauthenticated') {
            // Page protégée classique
            if (checkPaths(protectedPages, router.pathname) && !checkPaths(protectedExcluded, router.pathname)) {
                router.push(login)
                return
            }
    
            // Page protégée admin
            if (checkPaths(adminPages, router.pathname) && !checkPaths(adminExcluded, router.pathname)) {
                router.push(adminLogin)
                return
            }

            return setProtectedChildren(
                <>
                    {children}
                </>
            )
        }
        
        if (session.status === 'authenticated' && session.user) {
            if (checkPaths(adminPages, router.pathname) && !checkPaths(adminExcluded, router.pathname) && !session.user.role?.admin_access) {
                session.logout()
                // router.push(adminLogin)
                return
            }

            return setProtectedChildren(
                <>
                    {children}
                </>
            )
        }
    }, [session, router]) // eslint-disable-line react-hooks/exhaustive-deps
    
    
    return protectedChildren
}


export default MiddlewareProvider