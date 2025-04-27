import React from "react";
import { DialogContent, CircularProgress, Stack } from "@mui/material";
import { theme } from "../../index.jsx";

const DialogLoader = () => {
  return (
    <DialogContent
      sx={{
        backgroundColor: theme.background,
        color: theme.text,
        overflow: "hidden",
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ minHeight: 200 }}
      >
        <CircularProgress
          thickness={4}
          size={60}
          sx={{ color: theme.card.backgroundColor ?? "#1976d2" }}
        />
      </Stack>
    </DialogContent>
  );
};

export default DialogLoader;
