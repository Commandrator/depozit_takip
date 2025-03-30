import React, { useEffect, useState } from "react";
import { Close, Add } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
  TextField
} from "@mui/material";
import { langPack, theme } from "../../index.jsx";
import usePeriod from "../../hooks/usePeriod.tsx";
import PeriodDTO from "../../interfaces/period.dto.ts";
const CompanyPeriodDialog = ({
  dialogOpen,
  handleDialogAction,
  company,
  selectedCompanyId,
}) => {
  const { listPeriods, change, setChange } = usePeriod();
  const [periods, setPeriods] = useState<PeriodDTO[] | undefined>();
  const [viewCreate, setViewCreate] = useState<boolean>(false);
    // const [companyName, setCompanyName] = useState<string>("");
    // const [companyAbout, setCompanyAbout] = useState<string>("");
    // const [errors, setErrors] = useState<{ companyName?: string, companyAbout?:string }>({});
  useEffect(() => {
    const loader = async () => {
      if (change) {
        const data = await listPeriods(selectedCompanyId);
        if (data) {
          setPeriods(data);
          setChange(false);
        }
      }
    };
    loader();
  }, [listPeriods, setPeriods]);
    // Save the company and handle errors
    // const handleSave = async (e: React.FormEvent) => {
    //   e.preventDefault(); // Prevent form refresh
  
    //   let newErrors: { companyName?: string } = {};
  
    //   // Validate company name
    //   if (!companyName.trim()) {
    //     newErrors.companyName = langPack.company_name_cannot_be_blank;
    //   }
  
    //   // If validation errors exist, update errors state
    //   if (Object.keys(newErrors).length > 0) {
    //     setErrors(newErrors);
    //     return;
    //   }
  
    //   // Proceed with company creation
    //   // await createCompany({ name: companyName, about: companyAbout });
    //   setErrors({}); // Reset errors after successful save
    //   handleDialogAction(); // Close the dialog
    // };
    // const isValidCompanyName = (
    //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    //   setvalueSetter: (value: string) => void,
    //   errorOption:string,
    //   message:string
    // ) => {
    //   const value = e.target.value;
    //   const regex = /^[a-zA-ZçğıöşüÇĞİÖŞÜ0-9 ]+$/; // Boş girişleri ve sadece boşlukları engelle
    //   if (regex.test(value)) {
    //     setvalueSetter(value);
    //     setErrors((prev) => ({ ...prev, [errorOption]: "" })); // Hata varsa kaldır
    //   } else {
    //     setErrors((prev) => ({
    //       ...prev,
    //       [errorOption]: message,
    //     }));
    //   }
    // };
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 16px", // İç boşluk ekleyelim
        }}
      >
        <span>{langPack.company_periods}</span>

        <Button
          endIcon={viewCreate ? <Close /> : <Add />}
          color="inherit"
          onClick={() => {
            setViewCreate((prev) => !prev);
          }}
        >
          <Typography>{viewCreate ? "Vazgeç" : "Oluştur"}</Typography>
        </Button>
      </DialogTitle>
      {viewCreate ? (
        <DialogContent
          className="space-y-5"
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
             {/* <TextField
                  sx={{ "& .MuiInputBase-input": { color: theme.text } }}
                  required
                  autoFocus
                  margin="dense"
                  autoComplete="off"
                  label={langPack.company_name}
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={companyName}
                  onChange={(e) => isValidCompanyName(e, setCompanyName, "companyName", langPack.enter_letters_and_numbers_only)}
                  error={!!errors.companyName}
                  helperText={errors.companyName}
                />
                 <TextField
                  sx={{ "& .MuiInputBase-input": { color: theme.text } }}
                  required
                  autoFocus
                  margin="dense"
                  autoComplete="off"
                  label={langPack.company_name}
                  type="date"
                  fullWidth
                  variant="outlined"
                  value={companyName}
                  onChange={(e) => isValidCompanyName(e, setCompanyName, "companyName", langPack.enter_letters_and_numbers_only)}
                  error={!!errors.companyName}
                  helperText={errors.companyName}
                /> */}
          </Paper>
        </DialogContent>
        ) : (
        <DialogContent
          className="space-y-5"
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
            <div className="flex justify-between items-center">
              <form>arama</form>
            </div>
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
            {periods
              ? periods.map((period) => (
                  <PeriodItem period={period} key={period.id} />
                ))
              : null}
          </Paper>
        </DialogContent>
      )}
      <DialogActions sx={{ backgroundColor: theme.background }}>
        <Button
          endIcon={<Close />}
          color="error"
          variant="contained"
          sx={{
            mb: 2,
            mr: 2,
          }}
          onClick={handleDialogAction}
        >
          {langPack.close}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
const PeriodItem: React.FC<{ period: PeriodDTO }> = ({ period }) => {
  const today = new Date();
  const deadlineDate = new Date(period.deadline);
  const timeDiff = deadlineDate.getTime() - today.getTime();
  const daysRemaining = Math.max(
    0,
    Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
  ); // Negatif olmamalı

  return (
    <div className="relative backdrop-blur-sm hover:bg-opacity-25 bg-opacity-10 bg-white text-white rounded-lg shadow-md p-2">
      <h3 className="text-lg font-semibold text-white">{period.name}</h3>
      <div className="mt-1 text-sm">
        <Typography sx={{ color: theme.text }} variant="body2">
          <span className="text-gray-400">Oluşturulma:</span>{" "}
          {new Date(period.creation_date).toLocaleDateString()}
        </Typography>
        <Typography sx={{ color: theme.text }} variant="body2">
          <span className="text-gray-400">Güncelleme:</span>{" "}
          {new Date(period.last_update).toLocaleDateString()}
        </Typography>
        <Typography sx={{ color: theme.text }} variant="body2">
          <span className="text-gray-400">Son Tarih:</span>{" "}
          {new Date(period.deadline).toLocaleDateString()} ({daysRemaining} gün
          kaldı)
        </Typography>
      </div>
    </div>
  );
};

export default CompanyPeriodDialog;
