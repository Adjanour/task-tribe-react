import {HomeIcon} from '@heroicons/react/outline'
import {ClipboardListIcon} from '@heroicons/react/outline'
import {ReactNode} from "react";


export type NavItem = {
    title:string;
    icon: ReactNode;
    path?:string;
}

export const NavItems: NavItem[] = [
    {
        title:'Home',
        icon: <HomeIcon/>,
        path: '/'
    },
    {
        title:'Notification',
        icon: <ClipboardListIcon />,
        path: '/notification'
    }
]