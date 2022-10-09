import React from 'react'
import Sidebar from '../ui/global/Sidebar'


interface Props {
    children: React.ReactNode
}


const AdminLayout = ({ children }: Props) => {
    return (
        <div className="flex flex-row bg-default overflow-x-hidden h-screen w-full">
            <Sidebar />
            {
                children
            }
        </div>
    )
}

export default AdminLayout