import React, { createContext, useContext, useEffect } from "react";
import { signIn, signOut, useSession } from 'next-auth/react'
import { Directus_Files, Directus_Users, useGetCurrentUserLazyQuery, useUpdateCurrentUserMutation } from "graphql/generated/hooks";
import { useImage } from "components/hooks/useImage";
import { directusFileUpload } from "lib/files";
import { useTheme } from "next-themes";
import { SkeletonTheme } from "react-loading-skeleton";



export interface useCurrentUserResult {
    user: Directus_Users | undefined | null,
    userFullName: string | undefined,
    loadingUser: boolean,
    errorUser: any | undefined,
    refetchUser: () => Promise<any>,
    updateCurrentUser: {
        update: () => Promise<any>,
        updateAvatar: (e: any, item?: any) => Promise<any>,
        data: any | undefined,
        loading: boolean,
        error: any | undefined,
    },
    Avatar: any,
    userAvatarSrc: string | undefined,
    sidebarOpen: boolean,
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>,
}


interface Exposed extends useCurrentUserResult {
    status: 'authenticated' | 'unauthenticated' | 'loading',
    login: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
}


const Context = createContext<Exposed>({
    user: undefined,
    userFullName: undefined,
    loadingUser: false,
    errorUser: undefined,
    refetchUser: async () => { },
    updateCurrentUser: {
        update: async () => { },
        updateAvatar: async () => { },
        data: undefined,
        loading: false,
        error: undefined,
    },
    Avatar: undefined,
    userAvatarSrc: undefined,
    status: 'loading',
    login: async () => { },
    logout: async () => { },
    sidebarOpen: false,
    setSidebarOpen: () => { },
});


const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<any>(undefined);
    // context global -> sidebar
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    const { theme, setTheme } = useTheme();
    const session = useSession();


    // recuperer le current user dans le cache ou le faire appeler une fois
    const [getCurrUser, { data, error, loading, refetch }] = useGetCurrentUserLazyQuery({
        fetchPolicy: 'cache-first',
        nextFetchPolicy: 'network-only',
    })

    // recuperer url avatar de l'utilisateur connecté
    const { Image, src, updateImage } = useImage({
        image: (user?.avatar as Directus_Files) ?? undefined,
        defaultImage: 'anonymous.webp',
        loading,
        key: 'avatar',
        refetch,
    })

    // recuperer le fullname de l'utilisateur connecté
    const userFullName =
        user?.first_name && user?.last_name ? user?.first_name + ' ' + user?.last_name : 'Anonymous'

    // update le currentuser
    const [updateCurrentUser, { data: updateCurrentUserData, loading: updateCurrentUserLoading, error: updateCurrentUserError }] =
        useUpdateCurrentUserMutation()

    // update l'avatar de l'user connecté
    const handleUpdateAvatar = async (e: any, item?: any) => {
        e.preventDefault()

        if (e?.target?.files && e?.target?.files[0]) {
            if (user?.avatar) {
                await updateImage({ file: e.target.files[0], data: item })
            } else {
                if (user?.id) {
                    let { data: newAvatar } = await directusFileUpload({
                        file: e.target.files[0],
                        data: { ...item, uploaded_by: user?.id },
                    })
                    await updateCurrentUser({
                        variables: {
                            id: user?.id,
                            data: {
                                avatar: {
                                    id: newAvatar.data.id,
                                },
                            },
                        },
                    })
                }
            }
        }
    }

    // If session is not authenticated, return Anonymous user otherwise return current user
    useEffect(() => {
        if (session.status === 'unauthenticated') {
            setUser(undefined)
        } else if (session.status === 'authenticated') {
            getCurrUser(
                {
                    fetchPolicy: 'cache-first',
                    nextFetchPolicy: 'network-only',
                    onCompleted: (data: any) => {
                        setUser(data?.users_me as Directus_Users)
                    },
                    onError: () => {
                        setUser(undefined)
                    }
                }
            )
        }
    }, [session]) // eslint-disable-line react-hooks/exhaustive-deps


    // Code executed whenever the user changes / is updated / loaded the first time
    useEffect(() => {
        // Logic for all users and anonymous users
        if (user?.theme === 'dark' || user?.theme === 'light') {
            setTheme(user.theme)
        } else {
            if (typeof window !== undefined) {
                setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            }
        }

        if (user) {
            // Logic for authenticated user
        } else if (!user) {
            // Logic for anonymous users
        }
    }, [user]) // eslint-disable-line react-hooks/exhaustive-deps


    let exposed = {
        user,
        userFullName: userFullName,
        loadingUser: loading,
        errorUser: error,
        refetchUser: refetch,
        updateCurrentUser: {
            update: updateCurrentUser,
            updateAvatar: handleUpdateAvatar,
            data: updateCurrentUserData,
            loading: updateCurrentUserLoading,
            error: updateCurrentUserError,
        },
        Avatar: Image,
        userAvatarSrc: src,
        status: session.status,
        login: signIn,
        logout: signOut,
        sidebarOpen,
        setSidebarOpen,
    }

    return (
        // @ts-ignore
        <Context.Provider value={exposed as Exposed}>
            <SkeletonTheme baseColor={theme === 'dark' ? "#30363D" : "#f0f4f9"} highlightColor={theme === 'dark' ? "#3C4249" : "#FFFFFF"}>
                {children}
            </SkeletonTheme>
        </Context.Provider>
    )
}


export const useCurrentUser = () => useContext(Context);


export default UserProvider