type MessageItemType = {
  author: string;
  text: string;
  sendDate: string;
  sendTime: string;
  id: number;
  imgUrl: string;
  replying: boolean;
  replyData?: ReplyDataType;
  media?: {
    images?: string;
    video?: string;
    audio?: string;
  };
};

type MediaAttachmentType = {
  type: "image" | "video" | "audio";
  mediaUrl: string;
};

type ReplyContextType = {
  isReplying: boolean;
  replyData: ReplyDataType;
  handleReply: (data: ReplyDataType) => void;
  cancelReply: () => void;
};

type ReplyDataType = {
  id: number | null;
  text: string | null;
  author: string | null;
};

export type { MessageItemType, ReplyContextType, ReplyDataType, MediaAttachmentType };
