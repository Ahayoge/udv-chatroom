import { BrowserRouter, Routes, Route } from 'react-router';

import LoginPage from './Pages/LoginPage/LoginPage';
import ChatPage from './Pages/ChatPage/ChatPage';

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginPage />}></Route>
                <Route path=':id' element={<ChatPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
