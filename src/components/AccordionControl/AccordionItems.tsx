import {
    HomeIcon,
    ClipboardListIcon,
    CollectionIcon,
    UserGroupIcon,
    CogIcon,
    AcademicCapIcon,
    SpeakerphoneIcon,
    BookOpenIcon,
    GlobeAltIcon,
    LightningBoltIcon,
    IdentificationIcon,
    ChartSquareBarIcon,
    CalendarIcon
  } from '@heroicons/react/outline';
import { Children } from 'react';
  


export const AccordionItems = [
    {
        title:'Home',
        icon: <HomeIcon/>,
        path: '/'
    },
    {
        title:'Task',
        icon: <ClipboardListIcon />,
        path:"task",
        children: 
        [
            {
                title:'All Tasks',
                path: 'task/all',
            },
            {
                title:'My Tasks',
                path: 'task/my',
                icon: <UserGroupIcon />,
            },
            {
                title:'Assigned Tasks',
                path: 'task/assigned',
                icon: <ClipboardListIcon />,
            },
            {
                title:'Dashboard',
                path: 'task/dashboard',
                icon: <ChartSquareBarIcon />,
            },
            {
                title:'Calendar',
                path: 'task/calendar',
                icon: <CalendarIcon />,
            },
            {
                title:'Kanban',
                path:'task/Kanban',
                icon: <ClipboardListIcon />,
            }

        ]

    },
    {
        title:'Project',
        icon: <CollectionIcon />,
        children: [
            {
                title:'All Projects',
                path: 'projects/all',
            },
            {
                title:'My Projects',
                path: 'projects/my',
            },
            {
                title:'Assigned Projects',
                path: 'projects/assigned',
            }
        ]
    },
    {
        title:'Team',
        icon: <UserGroupIcon />,
        children: [
            {
                title:'All Teams',
                path: 'teams/all'
            },
            {
                title:'My Teams',
                path: 'teams/my',
                
            },
            {
                title:'Assigned Teams',
                path: 'teams/assigned',
            }
        ]
    },
    {
        title:'Dashboards',
        path: 'dashboards/',
        icon: <ChartSquareBarIcon />,
        children: [
            {
                title:'Task Dashboard',
                path: 'dashboards/task',
                icon: <ChartSquareBarIcon />,
            }
        ]
    },
    {
        title:'Settings',
        icon: <CogIcon />,
        path: 'settings/',
        children: [
            {
                title:'Profile',
                path: 'settings/profile',
                icon: <IdentificationIcon />,
            },
            {
                title:'Account',
                path: 'settings/account',
            },
            {
                title:'Notifications',
                path: 'settings/notifications',
            }
        ]
    },
    {
        title: 'Education',
        icon: <AcademicCapIcon />,
        path: 'education',
        // ... (additional education-related items)
      },
      {
        title: 'Announcements',
        icon: <SpeakerphoneIcon />,
        path: 'announcements',
        // ... (additional announcement-related items)
      },
      {
        title: 'Library',
        icon: <BookOpenIcon />,
        path: 'library',
        // ... (additional library-related items)
      },
      {
        title: 'Explore',
        icon: <GlobeAltIcon />,
        path: 'explore',
        // ... (additional explore-related items)
      },
      {
        title: 'Technology',
        icon: <LightningBoltIcon />,
        path: 'technology',
        // ... (additional technology-related items)
      }

]
