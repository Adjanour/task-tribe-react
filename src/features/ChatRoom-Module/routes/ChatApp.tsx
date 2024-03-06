import React, { useState, useEffect } from 'react';
import ChatRoom from '../components/ChatRoom';
import { Input, Button } from 'antd';

const ChatApp: React.FC = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [messageInput, setMessageInput] = useState<string>('');
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        // Set up WebSocket connection here
        const newSocket = new WebSocket('ws://localhost:8000/ws/chat/');
        setSocket(newSocket);

        // Listen for messages
        newSocket.addEventListener('message', function(event) {
            const newMessage = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, newMessage]);
        });

        // Clean up on component unmount
        return () => {
            newSocket.close();
        };
    }, []);

    const handleMessageSend = () => {
        if (!socket) return; // Check if socket is initialized

        // Send message to WebSocket
        const messageData = {
            message: messageInput,
            user_id: 'current_user_id', // Replace with current user's ID
            chat_room_id: 'current_chat_room_id', // Replace with current chat room's ID
        };
        socket.send(JSON.stringify(messageData));

        // Clear message input
        setMessageInput('');
    };

    return (
        <div>
            <ChatRoom messages={messages} />
            <Input value={messageInput} onChange={e => setMessageInput(e.target.value)} />
            <Button type="primary" onClick={handleMessageSend}>Send</Button>
        </div>
    );
};

export default ChatApp;
