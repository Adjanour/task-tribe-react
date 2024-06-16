import React, { useEffect, useState} from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd/es/select';

interface SelectEditProps<ValueType = any>
    extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
    fetchOptions: () => Promise<ValueType[]|undefined>;
    placeholder:string;
}

export function SelectEdit<ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any>(
    { placeholder,fetchOptions, ...props }: SelectEditProps<ValueType>,
)
{
    const [data,setData]=useState<ValueType[]|undefined>([])

    useEffect(()=>{
        fetchOptions().then((data)=>setData(data))
    },[])

    return (
        <Select
            showSearch
            placeholder={placeholder}
            {...props}
            options={data}
            optionFilterProp={'label'}
        />
    );
}


