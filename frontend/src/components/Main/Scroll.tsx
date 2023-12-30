import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React from "react";

interface ScrollProps {
  children: React.ReactNode;
}

const ScrollContainer = styled(Box)(() => ({
  height: `calc(100vh-190px)`,
  overflow: "scroll",
  "&::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundCOlor: "#555",
  },

  "&::-webkit-scrollbar-track": {},
  "&::-webkit-scrollbar-corner": {
    backgroundColor: "transparent",
  },
}));

const Scroll = ({ children }: ScrollProps) => {
  return <ScrollContainer>{children}</ScrollContainer>;
};

export default Scroll;
