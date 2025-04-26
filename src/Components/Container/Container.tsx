import s from './Container.module.css';
import { Outlet } from 'react-router';

const Container: React.FC = () => {
    return (
        <div className={`flex ${s.container}`}>
            <Outlet />
        </div>
    );
};

export default Container;
