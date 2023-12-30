import { useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import useCrud from "../../hooks/useCrud";
import { Server } from "../../@types/server";

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

const MessageInterface = () => {
  const [newMessage, setNewMessage] = useState<Message[]>([]);

  const [message, setMessage] = useState("");
  const { serverId, channelId } = useParams();
  const { fetchData } = useCrud<Server>(
    [],
    `/messages/?channel_id=${channelId}`
  );

  const socketUrl = channelId
    ? `ws://127.0.0.1:8000/${serverId}/${channelId}`
    : null;

  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: async () => {
      try {
        const data = await fetchData();
        setNewMessage([]);
        setNewMessage(Array.isArray(data) ? data : []);
        console.log("connected");
      } catch (error) {
        console.log(error);
      }
    },
    onClose: () => {
      console.log("closed");
    },
    onError: () => {
      console.log("Error");
    },
    onMessage: (message) => {
      const data = JSON.parse(message.data);
      setNewMessage((prev) => [...prev, data.new_message]);
      console.log(newMessage);
    },
  });
  return (
    <div>
      {newMessage.map((msg: Message, index: number) => {
        return (
          <div key={index}>
            <p>{msg.sender}</p>
            <p>{msg.content}</p>
            <p>{msg.timestamp}</p>
          </div>
        );
      })}
      <form>
        <label>
          EnterMessage:
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
      </form>
      <button
        onClick={() => {
          sendJsonMessage({ type: "message", message });
        }}
      >
        Send Message
      </button>
    </div>
  );
};

export default MessageInterface;