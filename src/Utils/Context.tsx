import { createContext, PropsWithChildren, useState, useContext } from 'react';
import { ReplyContextType, ReplyDataType } from './Types';

export const MyContext = createContext<ReplyContextType | null>(null);

export const useReplyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error('useReplyContext должен использоваться внутри ReplyContextProvider');
    }
    return context;
};

const ReplyContext = ({ children }: PropsWithChildren) => {
    const [replyData, setReplyData] = useState<ReplyDataType>({
        id: null,
        text: null,
        author: null,
    });

    const [isReplying, setReplying] = useState<boolean>(false);

    const handleReply = ({ id, text, author }: ReplyDataType) => {
        setReplying(true);
        setReplyData({ id, text, author });
    };
    const cancelReply = () => {
        setReplying(false);
    };
    
    const value = {
        isReplying,
        replyData,
        handleReply,
        cancelReply,
    };
    return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export default ReplyContext;
