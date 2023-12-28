import useCrud from "../../hooks/useCrud";
import { useEffect } from "react";
import { Box, ListItemAvatar, Typography } from "@mui/material";

interface Props {
  open: boolean;
}

interface Server {
  id: number;
  name: string;
  category: string;
  icon: string;
}
const PopularChannels: React.FC<Props> = ({ open }) => {
  const { dataCRUD, error, isLoading, fetchData } = useCrud<Server>(
    [],
    "/server/select/"
  );
  useEffect(() => {
    fetchData();
    console.log(dataCRUD);
  });

  return (
    <>
      <Box
        sx={{
          height: 50,
          p: 2,
          display: "flex",
          alignItems: "center",
          flex: "1 1 100%",
        }}
      >
        <Typography sx={{ display: open ? "block" : "none" }}>
          Popular
        </Typography>
      </Box>
    </>
  );
};

export default PopularChannels;
