import React from 'react';
import { Button as AntButton} from 'antd'
import type { ButtonProps } from 'antd/es/button';
import cn from "clsx";

interface BtnProps extends ButtonProps {
    text:string;
}
export  const Button: React.FC<BtnProps> = ({text,...props}) => (
    <AntButton {...props} className={cn("dark:text-white",props.className)} type="default">{text}</AntButton>
);


