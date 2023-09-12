import React, { useState } from 'react';
import { Input, Button } from 'antd';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendClick = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div>
      <Input
        placeholder="Escribe un mensaje..."
        value={message}
        onChange={handleInputChange}
      />
      <Button type="primary" onClick={handleSendClick}>
        Enviar
      </Button>
    </div>
  );
};

export default MessageInput;
