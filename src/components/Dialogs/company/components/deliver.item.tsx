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
  Switch
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
  const { handleDeleteInput, deleteOption, delete_deliver, update } =
    useDeliver();
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
          backgroundColor: theme.card.backgroundColor,
          color: theme.text,
          borderRadius: "12px",
          padding: "4px 16px",
          opacity: 0.5,
          transition: "opacity 0.3s ease",
          "&:hover": {
            opacity: 1,
          },
          "&.Mui-expanded": {
            opacity: 1,
            backgroundColor: theme.background,
          },
          position: "relative", // Switch'i konumlandırmak için gerekli
        }}
      >
        <div>
        <Typography component="span" sx={{ flexGrow: 1 }}>
          {deliver.employee}
          <Divider sx={{ borderColor: theme.text, borderWidth: 1 }} />
        </Typography>
        </div>
        <Switch
          checked={deliver.active}
          onChange={() => {
            update(String(deliver.company_id), String(deliver.id), {
              active: !deliver.active,
            });
          }}
          color="success"
          onClick={(e) => e.stopPropagation()} // Accordion açılmasını engeller
          onFocus={(e) => e.stopPropagation()} // Focus da tetiklenmesin
          sx={{
            position: "absolute",
            right: 40,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: {
            xs: "column", // küçük ekranda alt alta
            sm: "row", // tablet ve üstünde yan yana
          },
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          color="error"
          disabled={!deliver.company_user_id}
          onClick={() => {
            update(String(deliver.company_id), String(deliver.id), {
              mail: "",
            });
          }}
          sx={{
            mb: {
              xs: 1, // mobilde alt boşluk
              sm: 0, // büyük ekranda boşluk yok
            },
          }}
        >
          {langPack.employee_disconnet}
        </Button>

        <form
          onSubmit={(e) =>
            delete_deliver(String(deliver.company_id), String(deliver.id), e)
          }
        >
          <TextField
            size="small"
            label={langPack.employee_name}
            required
            placeholder={deliver.employee}
            onChange={handleDeleteInput}
            value={deleteOption}
            sx={{
              flexGrow: 1, // input genişleyebilir
              "& .MuiInputBase-input::placeholder": {
                fontSize: "10px",
              },
              mr: {
                xs: 0,
                sm: 2,
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
