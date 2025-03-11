import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

interface CreateCompanyDialogProps {
  dialogOpen: boolean;
  handleDialogAction: () => void;
}

const CreateCompanyDialog: React.FC<CreateCompanyDialogProps> = ({
  dialogOpen,
  handleDialogAction,
}) => {
  const [companyName, setCompanyName] = useState("");
  const [companyAbout, setCompanyAbout] = useState("");
  const [error, setError] = useState<string>("");

  const handleSave = () => {
    if (!companyName || !companyAbout) {
      setError("Şirket adı ve hakkında kısmı boş olamaz!");
      return;
    }

    // Kaydetme işlemi burada yapılacak
    console.log("Company Name:", companyName);
    console.log("Company About:", companyAbout);
    
    // Dialogu kapat
    handleDialogAction();
  };

  return (
    <Dialog open={dialogOpen} onClose={handleDialogAction} fullWidth maxWidth="md">
      <DialogTitle>Şirket Oluştur</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Şirket Adı"
          type="text"
          fullWidth
          variant="outlined"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          error={!!error}
          helperText={error && error.includes("Şirket adı") ? error : ""}
        />
        <TextField
          margin="dense"
          label="Hakkında"
          type="text"
          fullWidth
          variant="outlined"
          value={companyAbout}
          onChange={(e) => setCompanyAbout(e.target.value)}
          error={!!error}
          helperText={error && error.includes("hakkında") ? error : ""}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogAction} color="secondary">
          İptal
        </Button>
        <Button onClick={handleSave} color="primary">
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCompanyDialog;
