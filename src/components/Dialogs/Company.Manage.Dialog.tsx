import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  Divider,
  Box,
  Paper,
} from "@mui/material";
import {
  Close,
  DeleteForever,
  Edit as EditIcon,
  Save,
} from "@mui/icons-material";
import useCompany from "../../hooks/useCompany.tsx";
import { theme, langPack } from "../../index.jsx";

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
  theme,
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

const ManageCompanyDialog = (props) => {
  const { dialogOpen, handleDialogAction, selectedCompanyId, company } = props;
  const { deleteCompany } = useCompany();
  const handleDelete = async () => {
    await deleteCompany(selectedCompanyId);
    handleDialogAction();
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleDialogAction}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle
        sx={{
          backgroundColor: theme.background,
          color: theme.text,
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        {langPack.edit_content}
      </DialogTitle>
      <DialogContent
        className="space-y-4"
        sx={{
          backgroundColor: theme.background,
          color: theme.text,
        }}
      >
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
          <Typography variant="h6" gutterBottom>
            {langPack.company_about}
          </Typography>
          <InputContent
            title={langPack.input_context_title_company_name}
            defultValue={company.name}
            placeholder={langPack.input_context_palceholder_company_name}
            type="name"
            selectedCompanyId={selectedCompanyId}
            theme={theme}
          />
          <InputContent
            title={langPack.input_context_title_company_about}
            defultValue={company.about}
            placeholder={langPack.input_context_palceholder_company_about}
            type="about"
            selectedCompanyId={selectedCompanyId}
            theme={theme}
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
          <Typography variant="h6" gutterBottom>
            {langPack.respnsible_information}
          </Typography>
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
      </DialogContent>
      <DialogActions sx={{ backgroundColor: theme.background }}>
        <Button
          endIcon={<DeleteForever />}
          variant="contained"
          color="error"
          sx={{ backgroundColor: theme.deleteButton }}
          onClick={handleDelete}
        >
          {langPack.delete}
        </Button>
        <Button
          endIcon={<Close />}
          variant="contained"
          sx={{ backgroundColor: theme.closeButton }}
          onClick={handleDialogAction}
        >
          {langPack.close}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManageCompanyDialog;
