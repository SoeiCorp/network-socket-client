import { MessagesGroupByDate, ChatMessageWithName } from "../chat/ChatRoom/ChatMessageList";

export function appendMessage(formattedMessages: MessagesGroupByDate[], newMessage: ChatMessageWithName): MessagesGroupByDate[] {
    const dateKey = new Date(newMessage.createdAt).toDateString();
    const existingDate = formattedMessages.find((item) => item.Date === dateKey);
  
    const formattedMessage: ChatMessageWithName = {
      ...newMessage,
      createdAt: new Date(newMessage.createdAt),
    };
  
    if (existingDate) {
      existingDate.Messages.push(formattedMessage);
    } else {
      formattedMessages.push({
        Date: dateKey,
        Messages: [formattedMessage],
      });
    }
  
    return formattedMessages;
  }