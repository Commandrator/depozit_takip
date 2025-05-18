import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Button,
  AccordionActions,
  TextField,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import { langPack, theme } from "../../../../index.jsx";
import PeriodDTO from "../../../../interfaces/period.dto.ts";
import usePeriod from "../../../../hooks/usePeriod.tsx";
import EditInput from "./period.edit.input.tsx";
const PeriodItem: React.FC<{ period?: PeriodDTO }> = ({ period }) => {
  const { getDay, delete_period, handleDeleteInput, deleteOption } =
    usePeriod();
  if (!period) return null; // period yoksa hiçbir şey döndürme
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
        <Typography component="span">
          {period.name}
          <Divider
            sx={{ borderColor: theme.text, borderWidth: 1, elevation: 12 }}
          />
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <EditInput
          data={period}
          type="text"
          dataKey="name"
          label={langPack.period_name}
          required
        />
      </AccordionDetails>
      <AccordionDetails>
        <EditInput
          data={period}
          type="date"
          dataKey="deadline"
          label={langPack.expiration_date}
          required
        />
      </AccordionDetails>
      <AccordionDetails
        className="text-sm"
        sx={{
          backgroundColor: theme.background, // Details kısmının arka plan rengi (Summary ile aynı)
          color: theme.text, // Yazı rengi
          padding: "10px 16px",
        }}
      >
        <Typography sx={{ color: theme.text }} variant="body2">
          <span className="text-gray-400">
            {langPack.number_of_days_remaining}:
          </span>{" "}
          {getDay(period.deadline)}
        </Typography>
        <Typography sx={{ color: theme.text }} variant="body2">
          <span className="text-gray-400">{langPack.expiration_date}:</span>{" "}
          {new Date(period.deadline).toLocaleDateString()}
        </Typography>
        <Typography sx={{ color: theme.text }} variant="body2">
          <span className="text-gray-400">{langPack.last_update_date}:</span>{" "}
          {new Date(period.last_update).toLocaleDateString()}
        </Typography>
        <Typography sx={{ color: theme.text }} variant="body2">
          <span className="text-gray-400">{langPack.creation_date}:</span>{" "}
          {new Date(period.creation_date).toLocaleDateString()}
        </Typography>
      </AccordionDetails>
      <AccordionDetails
        className="text-sm"
        sx={{
          backgroundColor: theme.background,
          color: theme.text, // Yazı rengi
          padding: "10px 16px",
        }}
      >
        <Typography
          sx={{ color: theme.text }}
          component={ReactMarkdown}
          variant="body1"
        >
          {langPack.period_delete_message.replace(
            ":project_name:",
            period.name
          )}
        </Typography>
      </AccordionDetails>

      <AccordionActions
        sx={{
          backgroundColor: theme.background,
          color: theme.text,
          padding: "10px 16px",
        }}
      >
        <form
          onSubmit={(e) =>
            delete_period(e, String(period.company_id), String(period.id))
          }
        >
          <TextField
            size="small"
            required
            label={langPack.period_name}
            placeholder={period.name}
            onChange={handleDeleteInput}
            value={deleteOption}
            sx={{
              "& .MuiInputBase-input::placeholder": {
                fontSize: "10px",
              },
            }}
          />
          <Button
            variant="contained"
            disabled={deleteOption !== period.name}
            className="opacity-70 hover:opacity-100 transition-opacity duration-300"
            color="error"
            type="submit"
          >
            {langPack.delete}
          </Button>
        </form>
      </AccordionActions>
    </Accordion>
  );
};
export default PeriodItem;
