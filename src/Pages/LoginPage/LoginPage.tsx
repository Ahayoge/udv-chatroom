import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, TextInput, Container } from '@gravity-ui/uikit';

import s from './LoginPage.module.css';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const [pageNumber, setPageNumber] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [avatar, setAvatar] = useState<string>();

    const handleRoomNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPageNumber(e.target.value);
    };

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAvatar(e.target.value);
    };

    return (
        <Container maxWidth='s' className={`flex ${s.container}`}>
            <h1 className={s.title}>
                Здравствуйте! <br /> Пожалуйста, представьтесь и укажите номер комнаты, в которую
                желаете войти
            </h1>
            <TextInput
                className={s.input}
                type='text'
                name='nickname'
                size='xl'
                id=''
                placeholder='Никнейм'
                value={username}
                onChange={handleUsername}
            />
            <TextInput
                className={s.input}
                type='text'
                name='room'
                size='xl'
                id=''
                value={pageNumber}
                placeholder='№ комнаты'
                onChange={handleRoomNumber}
            />
            <TextInput
                className={s.input}
                type='text'
                name='nickname'
                size='xl'
                id=''
                placeholder='URL-ссылка на аватарку (по желанию)'
                value={avatar}
                onChange={handleAvatar}
            />
            <Button
                size='xl'
                view='action'
                onClick={() => {
                    navigate(`/${pageNumber}`, { state: { username: username, avatar: avatar } });
                }}>
                Войти
            </Button>
        </Container>
    );
};

export default LoginPage;
