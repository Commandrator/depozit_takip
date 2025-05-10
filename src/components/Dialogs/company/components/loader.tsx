import React from "react";
import { CircularProgress, Stack } from "@mui/material";
import { theme } from "../../../../index.jsx";
const Loader = () => (
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
);
export default Loader;
