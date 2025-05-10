import React from "react";
import { Box, Typography, DialogContent } from "@mui/material";
import { theme, langPack } from "../../index.jsx";
const ExampleContent = ({ company, selectedCompanyId, dialogType}) => {

  console.log(company, selectedCompanyId, dialogType);
  return (
    <Box p={2} height="9000px">
      <Typography variant="h6" color={theme.text}>
        {/* {langPack[label]} İçeriği */}
      </Typography>
      <Typography color={theme.text}>
        Bu sekmeye özel içerik buraya gelecek.
      </Typography>
    </Box>
  );
};
export default ExampleContent;
