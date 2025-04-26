import s from './MessageInput.module.css';
import { useState } from 'react';
import { Button, Icon, DropdownMenu, Modal, TextInput } from '@gravity-ui/uikit';
import {
    Xmark,
    PaperPlane,
    FaceSmile,
    Paperclip,
    Picture,
    MusicNote,
    Video,
} from '@gravity-ui/icons';

import EmojiPicker from 'emoji-picker-react';
import { useReplyContext } from '../../Utils/Context';

type Props = {
    onChange: any;
    value: any;
    handleEmoji: any;
    sendMessageFunction: any;
    mediaUploadFunction: any;
    media: any;
};

const MessageInput = ({
    onChange,
    value,
    handleEmoji,
    sendMessageFunction,
    mediaUploadFunction,
    media
}: Props) => {
    const [isEmojiVisible, setEmojiVisible] = useState<boolean>(false);
    const { isReplying, replyData, cancelReply } = useReplyContext();
    const { author, text } = replyData;
    const [open, setOpen] = useState(false);

    const handleModalOpen = () => {
        setOpen(!open);
    };

    const handleEmojiPicker = () => {
        setEmojiVisible(!isEmojiVisible);
    };
    return (
        <div className={s.message_input}>
            {isReplying && (
                <div className={`flex ${s.reply}`}>
                    <div className={s.line}></div>
                    <div className={s.data_wrap}>
                        <p className={s.author}>{author}</p>
                        <p>{text}</p>
                    </div>
                    <Button className={s.cancel_btn} onClick={cancelReply}>
                        <Icon data={Xmark}></Icon>
                    </Button>
                </div>
            )}
            <textarea
                className={s.textarea}
                name=''
                id=''
                rows={5}
                onChange={onChange}
                value={value}
                placeholder='Введите сообщение'
            />
            <DropdownMenu
                renderSwitcher={props => (
                    <Button {...props} className={s.attach}>
                        <Icon size={18} data={Paperclip} />
                    </Button>
                )}
                items={[
                    {
                        iconStart: <Icon size={16} data={Picture} />,
                        action: handleModalOpen,
                        text: 'Изображение',
                    },
                    {
                        iconStart: <Icon size={16} data={Video} />,
                        action: () => console.log('Delete'),
                        text: 'Видео',
                    },
                    {
                        iconStart: <Icon size={16} data={MusicNote} />,
                        action: () => console.log(''),
                        text: 'Аудио',
                    },
                ]}
            />
            <Modal
                open={open}
                onOpenChange={() => {
                    handleModalOpen();
                }}>
                <div className={`flex ${s.modal_content}`}>
                    <h2>Загрузка медиа</h2>
                    <TextInput
                        size='xl'
                        placeholder='Укажите ссылку на файл в формате URL'
                        value={media?.mediaUrl}
                        onChange={mediaUploadFunction}
                    />
                    <Button onClick={handleModalOpen} view='action' size='xl'>
                        Загрузить
                    </Button>
                </div>
            </Modal>
            <Button className={s.emoji_picker} size='m' onClick={handleEmojiPicker}>
                <Icon data={FaceSmile} size={22}></Icon>
            </Button>
            <Button className={s.message_send} size='m' onClick={sendMessageFunction}>
                <Icon data={PaperPlane} size={22}></Icon>
            </Button>

            <EmojiPicker
                style={{ position: 'absolute', bottom: 10, right: 40 }}
                open={isEmojiVisible}
                lazyLoadEmojis={true}
                onEmojiClick={handleEmoji}
            />
        </div>
    );
};

export default MessageInput;
