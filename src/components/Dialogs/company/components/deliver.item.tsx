import React from "react";
import DeliverDTO from "../../../../interfaces/deliver.dto";
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
import useDeliver from "../../../../hooks/useDeliver.tsx";
import EditInput from "./deliver.edit.input.tsx";
/**
 * # Deliver Item Element
 * ---
 * Personel işlemleri için kullanılacaktır.
 * ! EditDialgo için giden parametrelei isValid fonksiyonuna uygun olucak biçimde yeniden yapılandırlması sağlanacak
 *
 * @param param0
 * @returns
 */
const DeliverItem: React.FC<{ deliver?: DeliverDTO }> = ({
  deliver,
}): JSX.Element | null => {
  const { handleDeleteInput, deleteOption, delete_deliver } = useDeliver();
  if (!deliver) return null;
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
          {deliver.employee}
          <Divider
            sx={{ borderColor: theme.text, borderWidth: 1, elevation: 12 }}
          />
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <EditInput
          data={deliver}
          type="text"
          dataKey="employee"
          label={langPack.employee_name}
          required
        />
      </AccordionDetails>
      <AccordionDetails>
        <EditInput
          data={deliver}
          type="email"
          dataKey="mail"
          label={langPack.employee_mail}
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
          <span className="text-gray-400">{langPack.last_update_date}:</span>{" "}
          {new Date(deliver.last_update).toLocaleDateString()}
        </Typography>
        <Typography sx={{ color: theme.text }} variant="body2">
          <span className="text-gray-400">{langPack.creation_date}:</span>{" "}
          {new Date(deliver.created_date).toLocaleDateString()}
        </Typography>
        <Typography sx={{ color: theme.text }} variant="body2">
          <span className="text-gray-400">{langPack.employee_id}:</span>{" "}
          {deliver.company_user_id ?? langPack.employee_not_connected}
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
          {langPack.deliver_delete_message.replace(
            ":deliver_name:",
            deliver.employee
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
          onSubmit={(e) => delete_deliver(e, 
            String(deliver.company_id),
            String(deliver.id)
          )}
        >
          <TextField
            size="small"
            label={langPack.employee_name}
            required
            placeholder={deliver.employee}
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
            disabled={deleteOption !== deliver.employee}
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
export default DeliverItem;
