import React, { useState } from 'react';
import { Layout } from 'antd';
import MessageList from '../MessageList/MessageList';
import MessageInput from '../MessageInput/MessageInput';

const { Content } = Layout;

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text) => {
    const newMessage = {
      sender: 'Usuario',
      text: text
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div
    style={{
    minHeight: '100vh',
    padding: 20
    }}>
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
