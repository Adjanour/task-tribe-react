import  {Input as AntInput} from 'antd';
import type {TextAreaProps} from 'antd/es/input'
const {TextArea} = AntInput;

export const TextAreaEdit = ({...props}:TextAreaProps) => {
    return (
        <TextArea {...props} />
    )
}