import React, { useEffect, useState } from "react";
import { Close, Add } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
  TextField,
  ButtonGroup,
  Tooltip,
  IconButton,
  Button,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import { langPack, theme } from "../../index.jsx";
import usePeriod from "../../hooks/usePeriod.tsx";
import PeriodDTO from "../../interfaces/period.dto.ts";
const CompanyPeriodDialog = ({
  dialogOpen,
  handleDialogAction,
  // company,
  selectedCompanyId,
}) => {
  const { listPeriods, change, setChange, createPeriod } = usePeriod();
  const [periods, setPeriods] = useState<PeriodDTO[] | undefined>();
  const [viewCreate, setViewCreate] = useState<boolean>(false);
  const [deadline, setDeadline] = useState<string>(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return date.toISOString().split("T")[0]; // YYYY-MM-DD formatı
  });
  const [periodName, setperiodName] = useState<string>(() => {
    const currentYear = new Date().getFullYear();
    return `${currentYear} - ${currentYear + 1} `.concat(
      langPack.working_period
    );
  });
  const [errors, setErrors] = useState<{
    deadline?: string;
    periodName?: string;
  }>({});
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
  }, [listPeriods, setPeriods, setChange, change, selectedCompanyId]);
  // Save the company and handle errors
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: { deadline?: string; periodName?: string } = {};

    if (!periodName.trim())
      newErrors.periodName = langPack.company_name_cannot_be_blank;

    if (!deadline.trim())
      newErrors.deadline = langPack.company_name_cannot_be_blank;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    await createPeriod(selectedCompanyId, { name: periodName, deadline });
    setErrors({});
    handleDialogAction();
  };
  const isValidCompanyName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: (value: string) => void,
    errorKey: string,
    message: string,
    regex: RegExp // düzeltildi: string değil RegExp
  ) => {
    const value = e.target.value;
    const isValid = regex.test(value);
    setValue(value);
    setErrors((prev) => ({
      ...prev,
      [errorKey]: isValid ? "" : message,
    }));
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 16px", // İç boşluk ekleyelim
        }}
      >
        <span>{langPack.company_periods}</span>
        <ButtonGroup>
          <Tooltip title={langPack[viewCreate ? "back" : "create"]}>
            <IconButton
              sx={{ mb: 2, mr: 2, color: theme.menuItem.color }}
              onClick={() => {
                setViewCreate((prev) => !prev);
              }}
            >
              {viewCreate ? <ChevronLeftIcon /> : <Add />}
            </IconButton>
          </Tooltip>
          <Tooltip title={langPack.close}>
            <IconButton
              sx={{ mb: 2, mr: 2, color: theme.menuItem.color }}
              onClick={handleDialogAction}
            >
              <Close />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
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
            <TextField
              sx={{ "& .MuiInputBase-input": { color: theme.text } }}
              required
              autoFocus
              margin="dense"
              autoComplete="off"
              label={langPack.period_name}
              type="text"
              fullWidth
              variant="outlined"
              value={periodName}
              onChange={(e) =>
                isValidCompanyName(
                  e,
                  setperiodName,
                  "periodName",
                  langPack.enter_letters_and_numbers_only,
                  /^[a-zA-ZçğıöşüÇĞİÖŞÜ0-9 ]+$/
                )
              }
              error={!!errors.periodName}
              helperText={errors.periodName}
            />
            <TextField
              sx={{ "& .MuiInputBase-input": { color: theme.text } }}
              required
              autoFocus
              margin="dense"
              autoComplete="off"
              label={langPack.expiration_date}
              type="date"
              fullWidth
              variant="outlined"
              value={deadline}
              onClick={(e) => {
                const input = e.currentTarget.querySelector("input");
                if (input && "showPicker" in input) {
                  (input as any).showPicker();
                }
              }}
              onChange={(e) =>
                isValidCompanyName(
                  e,
                  setDeadline,
                  "deadline",
                  langPack.invalid_date_format,
                  /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
                )
              }
              error={!!errors.deadline}
              helperText={errors.deadline}
            />
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
            <Stack spacing={2}>
              {periods?.map((period) => (
                <PeriodItem key={period.id} period={period} />
              ))}
            </Stack>
          </Paper>
        </DialogContent>
      )}
      {viewCreate ? (
        <DialogActions sx={{ backgroundColor: theme.background }}>
          <Button
            variant="outlined"
            color="inherit"
            sx={{
              borderRadius: "20px", // Modern, yumuşak köşeler için ideal
              right: "14px",
              color: theme.text,
            }}
            onClick={handleSave}
            children={langPack.save}
          />
        </DialogActions>
      ) : null}
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
    <Accordion
      sx={{
        backgroundColor: theme.card.backgroundColor, // Accordion arka plan rengi
        color: theme.text, // Yazı rengi
        borderRadius: "12px",
        border: `1px solid ${theme.border}`, // Border rengi
        "&.Mui-expanded": {
          backgroundColor: theme.background, // Açıldığında Accordion tüm kısmı aynı arka planı alır
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          backgroundColor: theme.card.backgroundColor, // Summary kısmının arka plan rengi
          color: theme.text, // Yazı rengi
          borderRadius: "12px",
          padding: "4px 16px", // Padding
          opacity: 0.5, // Soluk başlangıç
          transition: "opacity 0.3s ease", // Yalnızca opacity geçişi
          "&:hover": {
            opacity: 1, // Hover durumunda netleşme
          },
          "&.Mui-expanded": {
            opacity: 1,
            backgroundColor: theme.background, // Açıldığında Accordion tüm kısmı aynı arka planı alır
          },
        }}
      >
        <Typography component="span">{period.name} 
        <Divider
          sx={{ borderColor: theme.text, borderWidth: 1, elevation: 12 }}
        /></Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: theme.background, // Details kısmının arka plan rengi (Summary ile aynı)
          color: theme.text, // Yazı rengi
          padding: "10px 16px",
        }}
      >
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
            {new Date(period.deadline).toLocaleDateString()} ({daysRemaining}{" "}
            gün kaldı)
          </Typography>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default CompanyPeriodDialog;
