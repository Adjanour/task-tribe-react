import {AccordionWithSearch} from '@/components/AccordionControl';
import React from 'react'
type MainLayoutProps ={
    children: React.ReactNode;
}


export const MainLayout = ({children}:MainLayoutProps) => {
  return (
    <div>
        <AccordionWithSearch/>
        <main className='layout'>{children}</main>
    </div>
  )
}
















