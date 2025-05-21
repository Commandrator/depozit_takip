import { Box, IconButton, Typography, Stack } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { theme, langPack } from "../../../../index.jsx";
import React from "react";
const Add = ({
  setViewCreate,
}: {
  setViewCreate: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
          {langPack.default_add_title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {langPack.default_add_subtitle}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Add;
