import React from 'react';
import { Button as AntButton} from 'antd'
import type { ButtonProps } from 'antd/es/button';

interface BtnProps extends ButtonProps {
    text:string;
}
export  const Button: React.FC<BtnProps> = ({text,...props}) => (
    <AntButton {...props} className="dark:text-white" type="default">{text}</AntButton>
);


