import React from 'react'
import { AiOutlineUser, AiOutlineFileProtect, AiOutlineLogout, AiOutlineFolderOpen, AiOutlineComment, AiOutlineRobot } from 'react-icons/ai/index'
import { CgProfile } from 'react-icons/cg/index'
import { SiDatabricks } from 'react-icons/si/index'
import { RiAdminLine, RiArchiveLine, RiArticleLine } from 'react-icons/ri/index'
import { useRouter } from "next/router";
import clsx from 'clsx'
import { signOut } from 'next-auth/react'
import { MdCheck, MdDeleteOutline, MdLogin, MdPersonOutline, MdTimer } from 'react-icons/md/index'
import { IoMdAdd } from 'react-icons/io/index'
import { useResponsive } from 'components/hooks/useResponsive'
import useClickOutside from 'components/hooks/useClickOutside'
import { useCurrentUser } from 'components/providers/UserProvider'


const routes = [
    {
        path: '/admin/content',
        root: '/admin/content/articles',
        name: 'Contenus',
        icon: SiDatabricks,
        subRoutes: [
            {
                path: '/admin/content/articles',
                name: 'Articles',
                icon: RiArticleLine,
            },
            {
                path: '/admin/content/comments',
                name: 'Commentaires',
                icon: AiOutlineComment,
            }
        ]
    },
    {
        path: '/admin/users',
        name: 'Utilisateurs',
        icon: AiOutlineUser,
        subRoutes: [
            {
                path: '/admin/users',
                name: 'Utilisateurs',
                icon: AiOutlineUser,
            },
            {
                path: '/admin/users/admin',
                name: 'Administrateurs',
                icon: RiAdminLine,
            },
            {
                path: '/admin/users/archived',
                name: 'Archivés',
                icon: RiArchiveLine,
            },
        ]
    },
    {
        path: '/admin/files',
        name: 'Fichiers',
        icon: AiOutlineFolderOpen,
        subRoutes: [
            {
                path: '/admin/files',
                name: 'Fichiers',
                icon: AiOutlineFolderOpen,
            },
            {
                path: '/admin/files/me',
                name: 'Fichiers perso',
                icon: AiOutlineUser,
            },
            {
                path: '/admin/files/recent',
                name: 'Fichiers récents',
                icon: MdTimer,
            },
        ]
    },
    {
        path: '/admin/logs',
        name: 'Historique',
        icon: AiOutlineFileProtect,
        subRoutes: [
            {
                path: '/admin/logs',
                name: 'Historique',
                icon: AiOutlineFileProtect,
            },
            {
                path: '/admin/logs/me',
                name: 'Historique Perso',
                icon: MdPersonOutline,
            },
            {
                space: true,
            },
            {
                path: '/admin/logs/create',
                name: 'Création',
                icon: IoMdAdd,
            },
            {
                path: '/admin/logs/update',
                name: 'Mise à jour',
                icon: MdCheck,
            },
            {
                path: '/admin/logs/delete',
                name: 'Suppression',
                icon: MdDeleteOutline,
            },
            {
                path: '/admin/logs/login',
                name: 'Connexion',
                icon: MdLogin,
            },
            {
                space: true,
            },
            {
                path: '/admin/logs/run',
                name: 'Programmes',
                icon: AiOutlineRobot,
            },
        ]
    }
]



const Sidebar = () => {
    const router = useRouter()
    const screen = useResponsive()
    const { sidebarOpen, setSidebarOpen } = useCurrentUser();

    let dynamicOpen = ['sm', 'md']
    const wrapperRef = React.useRef(null)

    useClickOutside(wrapperRef, () => {
        if (dynamicOpen.includes(screen)) {
            setSidebarOpen(false)
        }
    })

    return (
        <>
            {
                (dynamicOpen.includes(screen) && sidebarOpen) && (
                    <div className="w-full h-full absolute z-[90]" style={{ background: 'rgba(0, 0, 0, 0.5)' }} />
                )
            }
            <aside
                ref={wrapperRef}
                className={
                    `h-screen flex flex-col justify-start items-start top-0 z-[100] transition-all w-64 md:w-80 ${(dynamicOpen.includes(screen) && sidebarOpen) ? 'fixed -left-[0px]' : 'fixed -left-[256px]' } ${!dynamicOpen.includes(screen) ? 'sticky' : '' }`
                }
            >
                <div className="w-full h-14 md:h-16 flex flex-row">
                    <div className="flex flex-row justify-center items-center w-16 md:w-24 bg-l-secondary-main p-2">
                        <img src='/logo_white.svg' alt='Blogiz' width="42" height="42" />
                    </div>
                    <div className="h-full w-48 md:w-56 flex flex-col items-start justify-start bg-l-dark dark:bg-d-main">
                        <h2 className="flex flex-row items-center justify-start box-border w-full h-full pl-4 text-200 text-sm md:text-base">Blogiz</h2>
                    </div>
                </div>
                <div className="w-full h-[calc(100vh-56px)] md:h-[calc(100vh-64px)] flex flex-row items-start justify-start">
                    <div className="w-16 md:w-24 h-full flex flex-col items-start justify-between bg-d-dark dark:bg-d-default box-border">
                        <div className="flex flex-col items-start justify-start">
                            {routes.map((route, index) => {
                                return (
                                    <div
                                        className={
                                            clsx(
                                                "group w-16 h-16 md:w-24 md:h-24 flex flex-col items-center justify-center transition-all cursor-pointer",
                                                {
                                                    ["bg-l-main dark:bg-d-dark"]: router.pathname.includes(route.path),
                                                }
                                            )
                                        }
                                        key={index}
                                        onClick={() => route?.root ? router.push(route.root) : router.push(route.path)}
                                    >
                                        <route.icon
                                            className={
                                                clsx(
                                                    {
                                                        ["text-200"]: router.pathname.includes(route.path),
                                                        ["text-400 group-hover:text-d-200 group-hover:dark:text-d-200"]: !router.pathname.includes(route.path),
                                                    },
                                                    "w-6 h-6 transition-all",
                                                )
                                            }

                                        />
                                        <p
                                            className={
                                                clsx(
                                                    {
                                                        ["text-100"]: router.pathname.includes(route.path),
                                                        ["text-d-400 group-hover:text-d-100 group-hover:dark:text-d-100"]: !router.pathname.includes(route.path),
                                                    },
                                                    "hidden md:inline transition-all mt-[6px] text-xs",
                                                )
                                            }
                                        >
                                            {route.name}
                                        </p>
                                    </div>
                                )
                            }
                            )}
                        </div>
                        <div className="flex flex-col items-start justify-start">
                            <div
                                className="group w-16 h-16 md:w-24 md:h-24 flex flex-col items-center justify-center transition-all cursor-pointer text-l-400 dark:text-d-400"
                                onClick={() => signOut()}
                            >
                                <AiOutlineLogout
                                    className="w-7 h-7 transition-all group-hover:text-d-200 group-hover:dark:text-d-200"
                                />
                                <p
                                    className="hidden md:inline transition-all mt-[6px] text-xs group-hover:text-d-100 group-hover:dark:text-d-100"
                                >
                                    Déconnexion
                                </p>
                            </div>
                            <div
                                className={
                                    clsx(
                                        "group w-16 h-16 md:w-24 md:h-24 flex flex-col items-center justify-center transition-all cursor-pointer",
                                        {
                                            ["bg-l-main dark:bg-d-dark"]: router.pathname.includes('/admin/profil'),
                                        }
                                    )
                                }
                                onClick={() => router.push('/admin/profil')}
                            >
                                <CgProfile
                                    className={
                                        clsx(
                                            {
                                                ["text-200"]: router.pathname.includes('/admin/profil'),
                                                ["text-400 group-hover:text-d-200 group-hover:dark:text-d-200"]: !router.pathname.includes('/admin/profil'),
                                            },
                                            "w-6 h-6 transition-all",
                                        )
                                    }
                                />
                                <p
                                    className={
                                        clsx(
                                            {
                                                ["text-100"]: router.pathname.includes('/admin/profil'),
                                                ["text-d-400 group-hover:text-d-100 group-hover:dark:text-d-100"]: !router.pathname.includes('/admin/profil'),
                                            },
                                            "hidden md:inline transition-all mt-[6px] text-xs",
                                        )
                                    }
                                >
                                    Profil
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-[calc(100%-64px)] md:w-[calc(100%-96px)] h-full flex flex-col items-start justify-start bg-l-main dark:bg-d-dark p-2">
                        {
                            routes.map((route) => {
                                if (route.subRoutes && router.pathname.includes(route?.path)) {

                                    return (
                                        route.subRoutes.map((subRoute, index) => {
                                            if (subRoute?.path) {
                                                let light = ((router.pathname === subRoute?.path)) ||
                                                    router.pathname.slice(0, router.pathname.lastIndexOf('/')) === route.path && router.pathname === subRoute?.path ||
                                                    router.pathname.slice(0, router.pathname.lastIndexOf('/')) === subRoute?.path && subRoute?.path !== route.path

                                                return (
                                                    <div key={index} className="w-full" onClick={() => { router.push(subRoute?.path) }}>
                                                        <div
                                                            className={
                                                                clsx(
                                                                    "cursor-pointer box-border p-2 rounded-md my-[1px] transition-all group w-full h-10 flex flex-row items-center justify-start hover:bg-l-dark hover:dark:bg-d-main",
                                                                    {
                                                                        ["bg-l-dark dark:bg-d-main"]: (
                                                                            light
                                                                        ),
                                                                    },
                                                                    {
                                                                        ["bg-l-dark dark:bg-d-main"]: !router.pathname.includes('content') && !route.subRoutes.map((sR, index) => index !== 0 && sR.path === router.pathname).includes(true) && router.pathname.slice(0, router.pathname.lastIndexOf('/')) === subRoute.path && index === 0,
                                                                    }
                                                                )
                                                            }
                                                            onClick={() => { }}
                                                        >
                                                            <subRoute.icon className="ml-2 transition-all w-6 h-6 text-l-secondary-main dark:text-l-primary-main" />
                                                            <p className="ml-2.5 text-sm text-l-200 dark:text-d-200">{subRoute.name}</p>
                                                        </div>
                                                        {/* {route.subSidebar.divider && <Divider className={classes.sidebarDivider} />} */}
                                                    </div>
                                                )
                                            } else {
                                                return <hr className="w-full border border-l-main dark:border-d-main my-1" key={index} />
                                            }
                                        })
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar