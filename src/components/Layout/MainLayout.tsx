import Navbar from '@/Navbar';
import {AccordionWithSearch} from '@/components/AccordionControl';
import React from 'react'
type MainLayoutProps ={
    children: React.ReactNode;
}


export const MainLayout = ({children}:MainLayoutProps) => {
  return (
    <div>
        <AccordionWithSearch/>
        <main className='layout'>
          <div><Navbar/></div>
          <div>{children}</div>
          </main>
    </div>
  )
}
















