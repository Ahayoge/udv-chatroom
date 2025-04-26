import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './normalize.css';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './custom.css';
import { ThemeProvider } from '@gravity-ui/uikit';
import ReplyContext from './Utils/Context.tsx';

createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme='dark'>
        <ReplyContext>
            <App />
        </ReplyContext>
    </ThemeProvider>
);
