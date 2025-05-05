import { MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import {
  Business,
  AccountCircle,
  AdminPanelSettings,
} from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { langPack, theme } from "../..";
import useCompany from "../../hooks/useCompany.tsx";
import DefaultProps from "../../interfaces/Default.pros";
export default function CompanyFilter({
  className = "",
}: Readonly<DefaultProps>) {
  const { selectedOption, handleChangeRole } = useCompany();
  return (
    <Select
      value={selectedOption}
      onChange={(e) => handleChangeRole(e.target.value)}
      className={`p-2  text-white rounded-lg shadow-md ${className}`}
      MenuProps={{
        PaperProps: {
          sx: {
            bgcolor: theme.background,
            color: theme.text,
          },
        },
      }}
    >
      <MenuItem value="all">
        <div className="flex items-center gap-2">
          <Business fontSize="small" className="text-white" />
          <Typography variant="body1" className="text-white">
            {langPack.all}
          </Typography>
        </div>
      </MenuItem>
      <MenuItem value="owner">
        <div className="flex items-center gap-2">
          <AccountCircle fontSize="small" className="text-white" />
          <Typography variant="body1" className="text-white">
            {langPack.ownership}
          </Typography>
        </div>
      </MenuItem>
      <MenuItem value="editor">
        <div className="flex items-center gap-2">
          <AdminPanelSettings fontSize="small" className="text-white" />
          <Typography variant="body1" className="text-white">
            {langPack.executive}
          </Typography>
        </div>
      </MenuItem>
      <MenuItem value="viewer">
        <div className="flex items-center gap-2">
          <VisibilityIcon fontSize="small" className="text-white" />
          <Typography variant="body1" className="text-white">
            {langPack.executive}
          </Typography>
        </div>
      </MenuItem>
    </Select>
  );
}
