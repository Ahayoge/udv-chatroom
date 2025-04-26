import MessageItem from '../MessageItem/MessageItem';
import { MessageItemType } from '../../Utils/Types';

import s from './MessagesList.module.css';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';

type Props = {
    messages: MessageItemType[];
};

const renderMessages = (messages: MessageItemType[]) => (
    <OverlayScrollbarsComponent
        options={{
            scrollbars: { theme: 'os-theme-light', autoHide: 'leave', autoHideDelay: 100 },
        }}>
        <ul className={`flex ${s.message_list}`}>
            {messages.map(message => (
                <MessageItem message={message} key={messages.indexOf(message)}/>
            ))}
        </ul>
    </OverlayScrollbarsComponent>
);

const MessagesList: React.FC<Props> = ({ messages }) =>
    messages.length ? (
        renderMessages(messages)
    ) : (
        <p className={s.no_messages}>Сообщений пока нет. Напишите первым!</p>
    );

export default MessagesList;
