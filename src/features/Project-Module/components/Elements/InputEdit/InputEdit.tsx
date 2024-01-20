import  {Input as AntInput} from 'antd';
import type {InputProps} from 'antd/es/input'


export const InputEdit = ({...props}:InputProps) => {
    return (
        <AntInput {...props} />
    )
}