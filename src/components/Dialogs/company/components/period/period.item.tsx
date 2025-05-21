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
import { langPack, theme } from "../../../../../index.jsx";
import EditInput from "../default.type.edit.input.tsx";
import { Modules } from "../../../../../hooks/Modules/index.tsx";
import PeriodDTO from "../../../../../interfaces/period.dto.ts";
import useDialogContext from "../../../../../hooks/useDilaogContext.tsx";
interface DeaultInterface {
  result?: PeriodDTO;
  module: keyof Modules;
}
const PeriodItem: React.FC<DeaultInterface> = ({ result, module }) => {
  const { handleDeleteInput, deleteOption, delete_data } = useDialogContext({
    selectedCompanyId: String(result?.company_id ?? ""),
    module,
  });
  const getDay = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate.getTime() - today.getTime();
    return Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
  };
  if (!result) return null; // period yoksa hiçbir şey döndürme
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
          {result.name}
          <Divider
            sx={{ borderColor: theme.text, borderWidth: 1, elevation: 12 }}
          />
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <EditInput
          module={module}
          data={result}
          type="text"
          dataKey="name"
          label={langPack.period_name}
          required
        />
      </AccordionDetails>
      <AccordionDetails>
        <EditInput
          module={module}
          data={result}
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
          {getDay(result.deadline)}
        </Typography>
        <Typography sx={{ color: theme.text }} variant="body2">
          <span className="text-gray-400">{langPack.expiration_date}:</span>{" "}
          {new Date(result.deadline).toLocaleDateString()}
        </Typography>
        <Typography sx={{ color: theme.text }} variant="body2">
          <span className="text-gray-400">{langPack.last_update_date}:</span>{" "}
          {new Date(result.last_update).toLocaleDateString()}
        </Typography>
        <Typography sx={{ color: theme.text }} variant="body2">
          <span className="text-gray-400">{langPack.creation_date}:</span>{" "}
          {new Date(result.creation_date).toLocaleDateString()}
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
            result.name
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
            delete_data(String(result.company_id), String(result.id), e)
          }
        >
          <TextField
            size="small"
            required
            label={langPack.period_name}
            placeholder={result.name}
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
            disabled={deleteOption !== result.name}
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
export { PeriodItem };
export default PeriodItem;
