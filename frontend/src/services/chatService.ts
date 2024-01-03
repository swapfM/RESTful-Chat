import { useState } from "react";
import useWebSocket from "react-use-websocket";
import useCrud from "../hooks/useCrud";
import { Server } from "../@types/server";
import { useAuthService } from "../services/AuthServices";
import { WS_ROOT } from "../../config";

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

const useChatWebSocket = (channelId: string, serverId: string) => {
  const [newMessage, setNewMessage] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const { refreshAccessToken, logout } = useAuthService();

  const { fetchData } = useCrud<Server>(
    [],
    `/messages/?channel_id=${channelId}`
  );

  const socketUrl = channelId ? `${WS_ROOT}/${serverId}/${channelId}` : null;
  const [reconnectionAttempt, setReconnectionAttempt] = useState(0);
  const maxConnectionAttempts = 4;

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
    onClose: (event: CloseEvent) => {
      if (event.code == 4001) {
        console.log("Not authenticated");
        refreshAccessToken().catch((error) => {
          if (error.response && error.response.status === 401) {
            logout();
          }
        });
      }
      console.log("closed");
      setReconnectionAttempt((prev) => prev + 1);
    },
    onError: () => {
      console.log("Error");
    },
    onMessage: (message) => {
      const data = JSON.parse(message.data);
      setNewMessage((prev) => [...prev, data.new_message]);
      setMessage("");
    },
    shouldReconnect: (closeEvent) => {
      if (
        closeEvent.code === 4001 &&
        reconnectionAttempt >= maxConnectionAttempts
      ) {
        setReconnectionAttempt(0);
        return false;
      }
      return true;
    },
    reconnectInterval: 1000,
  });

  return {
    newMessage,
    message,
    setMessage,
    sendJsonMessage,
  };
};
export default useChatWebSocket;
