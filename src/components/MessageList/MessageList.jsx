import React from 'react';
import { List } from 'antd';

const MessageList = ({ messages }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={messages}
      renderItem={(message) => (
        <List.Item>
          <List.Item.Meta
            title={message.sender}
            description={message.text}
          />
        </List.Item>
      )}
    />
  );
};

export default MessageList;
