import React from 'react';
import { List } from 'antd';

interface ChatRoom {
    id: number;
    name: string;
}

interface Props {
    chatRooms: ChatRoom[];
    onSelect: (chatRoom: ChatRoom) => void;
}

const ChatRoomList: React.FC<Props> = ({ chatRooms, onSelect }) => (
    <List
        dataSource={chatRooms}
        renderItem={(chatRoom: ChatRoom) => (
            <List.Item onClick={() => onSelect(chatRoom)}>
                {chatRoom.name}
            </List.Item>
        )}
    />
);

export default ChatRoomList;
