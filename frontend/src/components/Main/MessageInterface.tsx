import { useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import useCrud from "../../hooks/useCrud";
import { Server } from "../../@types/server";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import MessageInterfaceChannels from "./MessageInterfaceChannels";
import { useTheme } from "@mui/material/styles";
import Scroll from "./Scroll";
import React from "react";
import { useAuthService } from "../../services/AuthServices";

interface SendMessageData {
  type: string;
  message: string;
  [key: string]: unknown;
}
interface ServerChannelProps {
  data: Server[];
}

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

const MessageInterface = (props: ServerChannelProps) => {
  const theme = useTheme();
  const { data } = props;
  const [newMessage, setNewMessage] = useState<Message[]>([]);

  const { refreshAccessToken, logout } = useAuthService();

  const [message, setMessage] = useState("");
  const { serverId, channelId } = useParams();
  const server_name = data?.[0]?.name ?? "Server";

  const { fetchData } = useCrud<Server>(
    [],
    `/messages/?channel_id=${channelId}`
  );

  const socketUrl = channelId
    ? `ws://127.0.0.1:8000/${serverId}/${channelId}`
    : null;

  const [reconnectionAttempt, setReconnectionAttempt] = useState<number>(0);
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
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendJsonMessage({
        type: "message",
        message,
      } as SendMessageData);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendJsonMessage({
      type: "message",
      message,
    } as SendMessageData);
  };

  function formatTimeStamp(timestamp: string): string {
    const date = new Date(Date.parse(timestamp));
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    const formattedTime = date.toLocaleDateString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${formattedDate} at ${formattedTime}`;
  }

  return (
    <>
      <MessageInterfaceChannels data={data} />
      {!channelId ? (
        <Box
          sx={{
            overflow: "hidden",
            p: { xs: 0 },
            height: `calc(80vh)`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              fontWeight={700}
              letterSpacing={"-0.5px"}
              sx={{ px: 5, maxWidth: "600px" }}
            >
              Welcome to {server_name}
            </Typography>
            <Typography>
              {data?.[0]?.description ?? "This is our Home"}
            </Typography>
          </Box>
        </Box>
      ) : (
        <>
          <Box sx={{ overflow: "hidden", p: 0, height: `calc(100vh - 100px)` }}>
            <Scroll>
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {newMessage.map((msg: Message, index: number) => {
                  return (
                    <ListItem key={index} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt="user image" />
                      </ListItemAvatar>
                      <ListItemText
                        primaryTypographyProps={{
                          fontSize: "12px",
                          variant: "body2",
                        }}
                        primary={
                          <>
                            <Typography
                              component="span"
                              variant="body1"
                              color="text.primary"
                              sx={{ display: "inline", fontW: 600 }}
                            >
                              {msg.sender}
                            </Typography>
                            <Typography
                              component="span"
                              variant="caption"
                              color="textSecondary"
                            >
                              {" at "}
                              {formatTimeStamp(msg.timestamp)}
                            </Typography>
                          </>
                        }
                        secondary={
                          <>
                            <Typography
                              variant="body1"
                              style={{
                                overflow: "visible",
                                whiteSpace: "normal",
                                textOverflow: "clip",
                              }}
                              sx={{
                                display: "inline",
                                lineHeight: 1.2,
                                fontWeight: 400,
                                letterSpacing: "-0.2px",
                              }}
                              component="span"
                              color="text.primary"
                            >
                              {msg.content}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Scroll>
          </Box>
          <Box sx={{ position: "fixed", bottom: 0, width: "70%" }}>
            <form
              onSubmit={handleSubmit}
              style={{
                bottom: 0,
                right: 0,
                padding: "1rem",
                backgroundColor: theme.palette.background.default,
                zIndex: 1,
              }}
            >
              <Box sx={{ display: "flex" }}>
                <TextField
                  fullWidth
                  multiline
                  value={message}
                  minRows={1}
                  maxRows={4}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setMessage(e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
              </Box>
            </form>
          </Box>
        </>
      )}
    </>
  );
};

export default MessageInterface;
