import {CalendarIcon, HomeIcon, UserIcon} from '@heroicons/react/outline'
import {ClipboardListIcon} from '@heroicons/react/outline'
import {ReactNode} from "react";
import {GlobalOutlined, MessageOutlined, SettingOutlined} from "@ant-design/icons";


export type NavItem = {
    title:string;
    icon: ReactNode;
    path?:string;
}

export const NavItems: NavItem[] = [

    {
        title: 'Profile',
        icon: <UserIcon />,
        path: '/profile'
    },
    {
        title: 'Settings',
        icon: <SettingOutlined />,
        path: '/settings'
    },
    {
        title: 'Messages',
        icon: <MessageOutlined />,
        path: '/messages'
    },
    {
        title: 'Calendar',
        icon: <CalendarIcon />,
        path: '/calendar'
    },
    {
        title: 'Explore',
        icon: <GlobalOutlined />,
        path: '/explore'
    },
    {
        title: 'Home',
        icon: <HomeIcon />,
        path: '/'
    },
    {
        title: 'Notification',
        icon: <ClipboardListIcon />,
        path: '/notification'
    },
    // Add more items as needed
]
