import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router';

import MessagesList from '../../Components/MessagesList/MessagesList';
import MessageInput from '../../Components/MessageInput/MessageInput';
import { MessageItemType, MediaAttachmentType } from '../../Utils/Types';
import { getMessageSendDate, getMessageSendTime } from '../../Utils/Time';
import { Container, Button, Icon, User } from '@gravity-ui/uikit';
import { ArrowLeft } from '@gravity-ui/icons';
import { FALLBACK_AVATAR } from '../../Utils/FallbackAvatar';
import { useReplyContext } from '../../Utils/Context';
import s from './ChatPage.module.css';

const ChatPage: React.FC = () => {
    const navigate = useNavigate();
    const { replyData, isReplying, cancelReply } = useReplyContext();

    const { state } = useLocation();
    const username = state?.username;
    const avatar = state?.avatar;

    const params = useParams();
    const [input, setInput] = useState('');

    const [messages, setMessages] = useState<MessageItemType[]>([]);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    const handleEmoji = (emojiObject: any) => {
        setInput(prev => prev + emojiObject.emoji);
    };

    const [media, setMedia] = useState<MediaAttachmentType>({
        type: 'audio',
        mediaUrl: '',
    });
    const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMedia({
            type: 'audio',
            mediaUrl: e.target.value,
        });
        console.log(media);
    };

    const getMessageList = () => {
        const messages = localStorage.getItem(`room_${params.id}`) || '';
        const parsedMessages = messages && JSON.parse(messages);
        return parsedMessages;
    };

    const updateMessageList = () => {
        const messages = getMessageList();
        setMessages(messages);
    };

    const handleMessages = (): void => {
        if (!input) return;
        const messages = getMessageList();
        const updatedMessages: MessageItemType[] = [
            ...messages,
            {
                author: username,
                text: input,
                sendDate: getMessageSendDate(),
                sendTime: getMessageSendTime(),
                id: messages.length,
                imgUrl: avatar ? avatar : FALLBACK_AVATAR,
                replyData: isReplying && replyData,
                replying: isReplying,
                media: media.mediaUrl.length && {
                    audio: media.mediaUrl
                },
            },
        ];
        localStorage.setItem(`room_${params.id}`, JSON.stringify(updatedMessages));
        setMessages(updatedMessages);
        setInput('');
        isReplying && cancelReply();
    };

    useEffect(() => {
        const messages = getMessageList();
        messages && setMessages(messages);
    }, []);

    return (
        <Container className={`flex ${s.container}`} maxWidth='m'>
            <User
                className={s.user}
                avatar={{
                    imgUrl: avatar ? avatar : FALLBACK_AVATAR,
                    fallbackImgUrl: FALLBACK_AVATAR,
                }}
                name={username}
                size='xl'
            />

            <div className={`flex ${s.top}`}>
                <Button size='m' view='outlined' onClick={() => navigate('/')}>
                    <Icon data={ArrowLeft} size={22}></Icon>
                </Button>
                <h1 className={s.title}>Комната {params.id}</h1>
                <Button className={s.update_btn} onClick={updateMessageList}>
                    Обновить список
                </Button>
            </div>

            <MessagesList messages={messages} />
            <MessageInput
                onChange={handleInput}
                value={input}
                handleEmoji={handleEmoji}
                sendMessageFunction={handleMessages}
                mediaUploadFunction={handleMediaUpload}
                media={media}
            />
        </Container>
    );
};

export default ChatPage;
