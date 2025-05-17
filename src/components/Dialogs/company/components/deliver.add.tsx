import { Box, IconButton, Typography, Stack } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { theme, langPack } from "../../../../index.jsx";
import React from "react";
const Add: React.FC<{
  setViewCreate: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setViewCreate }): JSX.Element => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Stack spacing={2} alignItems="center">
        <IconButton
          onClick={() => setViewCreate((prev) => !prev)}
          sx={{
            width: 80,
            height: 80,
            transition: "all 0.3s ease",
            opacity: 0.7,
            "&:hover": {
              opacity: 1,
              color: theme.primary ?? "#1976d2",
            },
          }}
        >
          <AddCircleIcon sx={{ fontSize: 60 }} />
        </IconButton>
        <Typography variant="h6" color={theme.text}>
          {langPack.add_a_deliver_title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {langPack.add_a_deliver_subtitle}
        </Typography>
      </Stack>
    </Box>
  );
};
export default Add;
