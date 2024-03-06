import React, { useState } from 'react';
import { Input, Button } from 'antd';

interface Props {
    onSend: (message: string) => void;
}

const MessageInput: React.FC<Props> = ({ onSend }) => {
    const [message, setMessage] = useState<string>('');

    const handleSend = () => {
        onSend(message);
        setMessage('');
    };

    return (
        <div>
            <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onPressEnter={handleSend}
                placeholder="Type your message..."
            />
            <Button type="primary" onClick={handleSend}>Send</Button>
        </div>
    );
};

export default MessageInput;
