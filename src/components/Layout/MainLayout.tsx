import {AccordionWithSearch} from '@/components/AccordionControl';
import React from 'react'
type MainLayoutProps ={
    children: React.ReactNode;
}


export const MainLayout = ({children}:MainLayoutProps) => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
        <AccordionWithSearch/>
        <main className='layout'>{children}</main>
    </div>
  )
}
