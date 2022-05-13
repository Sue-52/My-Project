import Icon from '@/components/Icon';
import { getToken } from '@/utils/token';
import { Input } from 'antd-mobile';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type Chat = {
  message: string;
  type: 'user' | 'xz';
};

const Chat = () => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [value, setValue] = useState('');
  const socketRef = useRef<Socket>();

  useEffect(() => {
    const chatListDOM = chatList.current;
    if (!chatListDOM) return;

    chatListDOM.scrollTop = chatListDOM.scrollHeight;
    // 1 建立连接
    const socketio = io('http://toutiao.itheima.net', {
      // 参数
      query: {
        token: getToken().token,
      },
      // 连接方式
      transports: ['websocket'],
    });

    // 2 连接成功
    socketio.on('connect', () => {
      console.log('websocket 连接成功');
      // 让小智给你打个招呼
      setChatList([
        { message: '你好，我是小智', type: 'xz' },
        { message: '你有什么疑问？', type: 'xz' },
      ]);
    });

    // 接收服务器返回的消息
    socketio.on('message', (data) => {
      setChatList((list) => [
        ...list,
        {
          message: data.msg,
          type: 'xz',
        },
      ]);
    });

    return () => socketio.close();
  }, []);

  // 发送消息
  const onSend = (e) => {
    if (e.code !== 'Enter' || value.trim() === '') return;

    // 发送消息给服务器
    socketRef.current?.emit('message', {
      msg: value,
      timestamp: Date.now() + '',
    });

    setChatList([
      ...chatList,
      {
        type: 'user',
        message: value,
      },
    ]);

    setValue('');
  };

  return (
    // ...
    <div className="chat-list">
      {chatList.map((item, index) => {
        return (
          <div
            key={index}
            className={classNames('chat-item', item.type === 'xz' ? 'self' : 'user')}
          >
            {item.type === 'xz' ? (
              <Icon type="iconbtn_xiaozhitongxue" />
            ) : (
              <img src="http://geek.itheima.net/images/user_head.jpg" alt="" />
            )}
            <div className="message">{item.message}</div>
          </div>
        );
      })}
      <Input
        className="no-border"
        placeholder="请描述您的问题"
        value={value}
        onChange={(value) => setValue(value)}
        onKeyDown={onSend}
      />
    </div>
  );
};

export default Chat;
