const date = new Date();

const getMessageSendDate = (): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
};

const getMessageSendTime = (): string => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes() + 1).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
};

export {getMessageSendDate, getMessageSendTime}