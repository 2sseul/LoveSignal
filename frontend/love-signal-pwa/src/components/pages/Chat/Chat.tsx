import { useEffect, useState } from "react";
import style from "./styles/Chat.module.scss";
import T_Chat from "../../templates/Chat/T_Chat";
import { useRecoilState } from "recoil";
import { roomInfo } from "../../../atom/chatRoom";
import { chatList } from "../../../atom/chat";
import T_ChatRoom from "../../templates/Chat/T_ChatRoom";
import { footerIsOn } from "../../../atom/footer";
import { footerIdx } from "../../../atom/footer";
import { chat } from "../../../types/chat";

const DUMMY_CHAT_LIST: chat[] = [
  {
    isMe: true,
    content: "안녕하세요",
    createdDate: "2023-04-30 11:58:38",
  },
  {
    isMe: false,
    content: "반가워요~~",
    nickname: "Tom",
    createdDate: "2023-04-30 12:02:12",
  },
  {
    isMe: true,
    content: "안녕하세요",
    createdDate: "2023-04-30 11:58:38",
  },
  {
    isMe: false,
    content: "반가워요~~",
    nickname: "Tom",
    createdDate: "2023-04-30 12:02:12",
  },
  {
    isMe: true,
    content: "안녕하세요",
    createdDate: "2023-04-30 11:58:38",
  },
  {
    isMe: false,
    content: "반가워요~~",
    nickname: "Tom",
    createdDate: "2023-04-30 12:02:12",
  },
  {
    isMe: true,
    content: "안녕하세요",
    createdDate: "2023-04-30 11:58:38",
  },
  {
    isMe: false,
    content: "반가워요~~",
    nickname: "Tom",
    createdDate: "2023-04-30 12:02:12",
  },
  {
    isMe: true,
    content: "안녕하세요",
    createdDate: "2023-04-30 11:58:38",
  },
  {
    isMe: false,
    content: "반가워요~~",
    nickname: "Tom",
    createdDate: "2023-04-30 12:02:12",
  },
  {
    isMe: true,
    content: "안녕하세요",
    createdDate: "2023-04-30 11:58:38",
  },
  {
    isMe: false,
    content: "반가워요~~",
    nickname: "Tom",
    createdDate: "2023-04-30 12:02:12",
  },
];

const Chat = () => {
  const [selectedRoom, setSelectedRoom] = useRecoilState(roomInfo);
  const [idx, setIdx] = useRecoilState<number>(footerIdx);
  const [_, setFooterIsOn] = useRecoilState(footerIsOn);
  const [chat, setChatList] = useRecoilState(chatList);

  // const [chatList, setChatList] = useState<chat[]>([...DUMMY_CHAT_LIST]);
  const [prevViewport, setPrevViewport] = useState<number | undefined>(
    window.visualViewport?.height
  );

  useEffect(() => {
    setIdx(2);
    window.addEventListener("resize", unitHeightSetHandler);
    window.addEventListener("touchend", unitHeightSetHandler);
    window.visualViewport?.addEventListener(
      "resize",
      resizeVisualViewportHandler
    );

    return () => {
      setSelectedRoom({});
      setFooterIsOn(true);
      window.removeEventListener("resize", unitHeightSetHandler);
      window.removeEventListener("touchend", unitHeightSetHandler);
      window.visualViewport?.removeEventListener(
        "resize",
        resizeVisualViewportHandler
      );
    };
  }, []);

  useEffect(() => {
    // const typeAdded = chatList.map((item) => ({
    //   ...item,
    //   roomType: selectedRoom.type,
    // }));
    const typeAdded = chat.map((item) => ({
      ...item,
      roomType: selectedRoom.type,
    }));
    console.log("방 타입 추가된 데이터 : ", typeAdded);
    setChatList([...typeAdded]);
  }, [selectedRoom]);

  const unitHeightSetHandler = () => {
    let vh = window.visualViewport?.height;
    if (!vh) {
      vh = window.innerHeight * 0.01;
    } else {
      vh *= 0.01;
    }
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  const resizeVisualViewportHandler = () => {
    const current = window.visualViewport?.height;
  };

  const roomExitHandler = () => {
    setSelectedRoom({});
    setFooterIsOn(true);
  };

  // const textSendHandler = (content: string) => {
  //   if (content.trim().length < 1) return;

  //   const now = new Date();
  //   const currTime = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}}}`;
  //   setChatList(() => [
  //     ...chat,
  //     {
  //       // roomType: selectedRoom.type,
  //       // isMe: true,
  //       content: content,
  //       nickname: "Tom",
  //       createdDate: currTime,
  //     },
  //   ]);
  // };

  return (
    <div
      className={`${style.container} ${
        selectedRoom.uuid ? style.expanded : ""
      }`}
    >
      {/* 채팅방 타입은 TEAM, ALL, NOTICE, ANONYMOUS로 나뉘어져 있음 */}
      {/* 채팅방 타입은 SYSTEM, TEAM, MEETING, SECRET, SIGNAL 나뉘어져 있음 */}
      {selectedRoom.uuid && (
        <T_ChatRoom
          className={`${selectedRoom.uuid ? "slide-in-enter" : ""} common-bg`}
          roomId={selectedRoom.uuid}
          title={selectedRoom.roomName}
          count={selectedRoom.memberCount}
          roomExitHandler={roomExitHandler}
          roomType={selectedRoom.type}
          // chatList={chatList}
          // onTextSend={textSendHandler}
        />
      )}
      {!selectedRoom.uuid && <T_Chat />}

      {/* <T_Chat />
      <T_ChatRoom
        className={`${selectedRoom.uuid ? "slide-in-enter" : ""} common-bg`}
        roomId={selectedRoom.uuid}
        title={selectedRoom.roomName}
        count={selectedRoom.memberCount}
        roomExitHandler={roomExitHandler}
        roomType={selectedRoom.type}
        // chatList={chat}
        // onTextSend={textSendHandler}
      /> */}
    </div>
  );
};

export default Chat;
