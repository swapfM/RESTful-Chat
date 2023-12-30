import { useParams } from "react-router-dom";
import { Server } from "../../@types/server";
import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  ListItemAvatar,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { MEDIA_URL } from "../../../config";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ServerChannels from "../SecondaryDraw/ServerChannels";
import { useEffect, useState } from "react";

interface ServerChannelProps {
  data: Server[];
}

const MessageInterfaceChannels = (props: ServerChannelProps) => {
  const [sideMenu, setSideMenu] = useState<boolean>(false);
  const theme = useTheme();
  const { data } = props;

  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const { serverId, channelId } = useParams();
  const channelName =
    data
      ?.find((server) => server.id == Number(serverId))
      ?.channel_server?.find((channel) => channel.id === Number(channelId))
      ?.name || "home";

  const toggleDrawer = () => {
    setSideMenu((prev) => !prev);
  };

  const list = () => {
    return (
      <Box
        sx={{ paddingTop: `${theme.primaryAppBar.height}px`, minWidth: 200 }}
        role="presentation"
      >
        <ServerChannels data={data} />
      </Box>
    );
  };

  useEffect(() => {
    if (isSmallScreen && sideMenu) {
      setSideMenu(false);
    }
  }, [isSmallScreen]);

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: theme.palette.background.default,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
        color="default"
        position="sticky"
        elevation={0}
      >
        <Toolbar
          variant="dense"
          sx={{
            minHeight: theme.primaryAppBar.height,
            height: theme.primaryAppBar.height,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <ListItemAvatar sx={{ minWidth: "40px" }}>
              <Avatar
                alt="Server Icon"
                src={`${MEDIA_URL}${data?.[0]?.icon}`}
                sx={{ width: 30, height: 30 }}
              />
            </ListItemAvatar>
          </Box>
          <Typography noWrap component="div">
            {channelName}
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton color="inherit" onClick={toggleDrawer} edge="end">
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer}>
            {list()}
          </Drawer>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default MessageInterfaceChannels;
