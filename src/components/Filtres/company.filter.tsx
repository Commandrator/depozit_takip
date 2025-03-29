import { MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  Business,
  AccountCircle,
  AdminPanelSettings,
} from "@mui/icons-material";
import {langPack} from "../..";
interface CompanyFilterProps {
  readonly className?: string;
}

export default function CompanyFilter({
  className = "",
}: Readonly<CompanyFilterProps>) {
  const [selectedOption, setSelectedOption] = useState("sahiplik");

  return (
    <Select
      value={selectedOption}
      onChange={(e) => setSelectedOption(e.target.value)}
      className={`p-2  text-white rounded-lg shadow-md ${className}`}
      MenuProps={{
        PaperProps: {
          sx: {
            bgcolor: "rgb(30, 41, 59)", // Tailwind slate-700 rengini kullandım
            color: "white",
          },
        },
      }}
    >
      <MenuItem disabled value="">
        <div className="flex items-center gap-2">
          <Business fontSize="small" className="text-white" />
          <Typography variant="body1" className="text-white">
            {langPack.all}
          </Typography>
        </div>
      </MenuItem>
      <MenuItem value="sahiplik">
        <div className="flex items-center gap-2">
          <AccountCircle fontSize="small" className="text-white" />
          <Typography variant="body1" className="text-white">
            {langPack.ownership}
          </Typography>
        </div>
      </MenuItem>
      <MenuItem disabled value="yonetim">
        <div className="flex items-center gap-2">
          <AdminPanelSettings fontSize="small" className="text-white" />
          <Typography variant="body1" className="text-white">
            {langPack.executive}
          </Typography>
        </div>
      </MenuItem>
    </Select>
  );
}
