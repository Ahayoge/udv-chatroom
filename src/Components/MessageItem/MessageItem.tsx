import { MessageItemType } from '../../Utils/Types';

import s from './MessageItem.module.css';
import { useLocation } from 'react-router';
import { Avatar, DropdownMenu } from '@gravity-ui/uikit';
import { FALLBACK_AVATAR } from '../../Utils/FallbackAvatar';
import clsx from 'clsx';
import { useReplyContext } from '../../Utils/Context';

type Props = {
    message: MessageItemType;
};

const MessageItem: React.FC<Props> = ({ message }) => {
    const { state } = useLocation();
    const username = state?.username;
    const { handleReply } = useReplyContext();
    const { text, imgUrl, author, sendDate, sendTime, id, replyData, media } = message;
    return (
        <li className={clsx('flex', s.message_item, username == author && s.myself)}>
            <Avatar
                className={s.avatar}
                imgUrl={imgUrl}
                size='l'
                fallbackImgUrl={FALLBACK_AVATAR}
            />
            <div className={`flex ${s.content}`}>
                <div className={`flex ${s.message_top}`}>
                    <span className={s.author_name}>{author}</span>
                    {sendTime} {sendDate}
                    <DropdownMenu
                        items={[
                            {
                                action: () => handleReply({ id, text, author }),
                                text: 'Ответить',
                            },
                        ]}
                    />
                </div>
                {replyData && (
                    <div className={s.reply}>
                        <p className={s.author_name}>
                            <i>{replyData.author}</i>
                        </p>
                        <p>
                            <i>{replyData.text}</i>
                        </p>
                    </div>
                )}
                <p>{text}</p>
                {media?.audio?.length && <audio controls src={media.audio} />}
            </div>
        </li>
    );
};

export default MessageItem;
