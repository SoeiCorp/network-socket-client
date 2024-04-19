import React from "react";
import ChatMessage from "./ChatMessage";
import { MessagesGroupByDate } from "./ChatMessageList";
import Avatar from "../ChatList/Avatar";

type Props = {
  messageByDate: MessagesGroupByDate;
  senderId: number;
  isGroupChat: boolean;
};

export default function ChatMessageListByDate({
  messageByDate,
  senderId,
  isGroupChat,
}: Props) {
  const { Date, Messages } = messageByDate;
  const formattedDate = (Date: string) => {
    const [day, month, date, year] = Date.split(" ");
    const thaiDay: { [key: string]: string } = {
      Mon: "จ.",
      Tue: "อ.",
      Wed: "พ.",
      Thu: "พฤ.",
      Fri: "ศ.",
      Sat: "ส.",
      Sun: "อา.",
    };
    const numMonths: { [key: string]: number } = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12,
    };

    const formattedDay = thaiDay[day];
    const formattedMonth = numMonths[month];

    return `${formattedDay} ${date}/${formattedMonth}`;
  };

  return (
    <div className="flex flex-col">
      <div className="self-center text-slate-500 text-[12px] my-[14px] lg:text-[14px] lg:my-[16px] py-[2px] px-[8px] lg:px-[10px] rounded-xl bg-neutral-200">
        {formattedDate(Date)}
      </div>
      <div className="flex flex-col-reverse">
        {Messages.slice()
          .reverse()
          .map((message, index, array) => (
            <React.Fragment key={index}>
              {message.userId !== senderId &&
              (index === array.length - 1 ||
                message.userId !== array[index + 1].userId) ? (
                <div className="flex item gap-3 mt-3">
                  <Avatar
                    name={message.userName}
                    userId={message.userId}
                    className="h-[36px] w-[36px] text-sm"
                  />
                  <div>
                    {isGroupChat && (
                      <p className="text-slate-700 text-sm font-medium">
                        {message.userName}
                      </p>
                    )}
                    <ChatMessage
                      key={index}
                      message={message}
                      senderId={senderId}
                      isGroupChat={isGroupChat}
                    />
                  </div>
                </div>
              ) : message.userId !== senderId ? (
                <div className="flex item gap-3">
                  <Avatar
                    name={message.userName}
                    userId={message.userId}
                    className="h-[36px] w-[36px] text-sm invisible"
                  />
                  <ChatMessage
                    key={index}
                    message={message}
                    senderId={senderId}
                    isGroupChat={isGroupChat}
                  />
                </div>
              ) : (
                <ChatMessage
                  key={index}
                  message={message}
                  senderId={senderId}
                  isGroupChat={isGroupChat}
                />
              )}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}
