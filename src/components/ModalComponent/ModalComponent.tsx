import {Modal,Button} from "antd";
import React, {ReactNode, useState} from 'react';

const ModalComponent =({children,title}:{children:ReactNode,title:string}) =>{
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button type="default" onClick={showModal}>
                Open
            </Button>
            <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {children}
            </Modal>
        </>


    );
}
export default ModalComponent;


