import React, { useState } from "react";
import {
  Button,
  IconButton,
  TextField,
  Typography,
  Divider,
  Box,
  Paper,
  Stack,
} from "@mui/material";
import {
  Close,
  DeleteForever,
  Edit as EditIcon,
  Save,
} from "@mui/icons-material";
import useCompany from "../../../hooks/useCompany.tsx";
import { theme, langPack } from "../../../index.jsx";
import ContentProps from "../../../interfaces/content.props.ts";
const ContentItem = ({ title, content, theme }) => {
  return content ? (
    <Typography variant="body1" sx={{ color: theme.text }}>
      <b>{title}:</b> {content}
    </Typography>
  ) : null;
};
const InputContent = ({
  defultValue,
  title,
  placeholder,
  type,
  selectedCompanyId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(defultValue);
  const { updateCompany } = useCompany();
  const handleEditToggle = () => {
    if (isEditing) setValue(defultValue);
    setIsEditing(!isEditing);
  };
  const handleInputChange = (e) => setValue(e.target.value);

  const saveChanges = async (e) => {
    e.preventDefault();
    await updateCompany(selectedCompanyId, { [type]: value });
    setIsEditing(false);
  };
  const cancelChanges = () => {
    setValue(defultValue);
    setIsEditing(false);
  };
  return (
    <Box display="flex" flexDirection="column" gap={1} width="100%">
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        sx={{ color: theme.text }}
      >
        {title}
      </Typography>
      <Box display="flex" alignItems="center" gap={1}>
        <TextField        
          size="small"
          type="text"
          autoComplete="off"
          fullWidth
          value={value ?? ""}
          placeholder={placeholder}
          disabled={!isEditing}
          onChange={handleInputChange}
          sx={{
            "& .MuiInputBase-input": {
              color: theme.text,
            },
          }}
        />
        <IconButton
          onClick={isEditing ? cancelChanges : handleEditToggle}
          sx={{
            color: theme.text,
            "&.Mui-disabled": {
              color: theme.disabledText,
            },
          }}
        >
          {isEditing ? <Close /> : <EditIcon />}
        </IconButton>
        <IconButton
          onClick={saveChanges}
          disabled={!(isEditing && value !== defultValue)}
          sx={{
            color: theme.text,
            "&.Mui-disabled": {
              color: theme.disabledText,
            },
          }}
        >
          <Save />
        </IconButton>
      </Box>
    </Box>
  );
};
const ManageCompanyContent : React.FC<ContentProps> = (props) => {
  const { selectedCompanyId, company } = props;
  const { deleteCompany, handleDialogClose } = useCompany();
  const handleDelete = async () => {
    await deleteCompany(selectedCompanyId);
    handleDialogClose();
  };
  if (!company) return null;
  return (
    <Stack spacing={2} sx={{ padding: "16px" }}>
      <Stack spacing={2} sx={{ padding: "16px" }}>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: "12px",
            backgroundColor: theme.card.backgroundColor,
            color: theme.text,
            border: `1px solid ${theme.border}`,
          }}
        >
          <InputContent
            title={langPack.input_context_title_company_name}
            defultValue={company.name}
            placeholder={langPack.input_context_palceholder_company_name}
            type="name"
            selectedCompanyId={selectedCompanyId}
          />
          <InputContent
            title={langPack.input_context_title_company_about}
            defultValue={company.about}
            placeholder={langPack.input_context_palceholder_company_about}
            type="about"
            selectedCompanyId={selectedCompanyId}
          />
        </Paper>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: "12px",
            backgroundColor: theme.card.backgroundColor,
            color: theme.text,
            border: `1px solid ${theme.border}`,
          }}
        >
          <ContentItem
            title={langPack.respnsible}
            content={company.responsible.username}
            theme={theme}
          />
          <ContentItem
            title={langPack.respnsible_id}
            content={company.responsible.id}
            theme={theme}
          />
          <ContentItem
            title={langPack.mail}
            content={company.responsible.email}
            theme={theme}
          />
          <ContentItem
            title={langPack.phone_number}
            content={company.responsible.phone_number}
            theme={theme}
          />
          <ContentItem
            title={langPack.adress}
            content={company.responsible.address}
            theme={theme}
          />
          <Divider sx={{ my: 2 }} />
          <ContentItem
            title={langPack.company_id}
            content={selectedCompanyId}
            theme={theme}
          />
          <ContentItem
            title={langPack.creation_date}
            content={new Date(company.responsible.created_at).toLocaleString()}
            theme={theme}
          />
          <ContentItem
            title={langPack.last_update_date}
            content={new Date(company.responsible.updated_at).toLocaleString()}
            theme={theme}
          />
        </Paper>
      </Stack>
      <Button
        endIcon={<DeleteForever />}
        variant="contained"
        color="error"
        sx={{ backgroundColor: theme.deleteButton }}
        onClick={handleDelete}
      >
        {langPack.delete}
      </Button>
    </Stack>
  );
};
export default ManageCompanyContent;
