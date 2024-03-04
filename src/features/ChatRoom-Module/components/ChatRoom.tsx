import React from 'react';
import { List, Avatar } from 'antd';

interface Message {
    sender: string;
    content: string;
    avatar: string;
}

interface Props {
    messages: Message[];
}

const ChatRoom: React.FC<Props> = ({ messages }) => (
    <List
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={(message: Message) => (
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar src={message.avatar} />}
                    title={message.sender}
                    description={message.content}
                />
            </List.Item>
        )}
    />
);

export default ChatRoom;
