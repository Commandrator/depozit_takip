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
  Switch,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import { langPack, theme } from "../../../../../index.jsx";
import EditInput from "../default.type.edit.input.tsx";
import useDialogContext from "../../../../../hooks/useDilaogContext.tsx";
import { Modules } from "../../../../../hooks/Modules/index.tsx";
import DepositeTypeDTO from "../../../../../interfaces/deposite.types.dto.ts";
/**
 * # deposite Item Element
 * ---
 * Personel işlemleri için kullanılacaktır.
 * ! EditDialgo için giden parametrelei isValid fonksiyonuna uygun olucak biçimde yeniden yapılandırlması sağlanacak
 *
 * @param param0
 * @returns
 */
interface DeaultInterface {
  result?: DepositeTypeDTO;
  module: keyof Modules;
}
export const Item: React.FC<DeaultInterface> = ({
  result,
  module,
}): JSX.Element | null => {
  const { handleDeleteInput, deleteOption, delete_data, update } =
    useDialogContext({
      selectedCompanyId: String(result?.company_id ?? ""),
      module,
    });
  if (!result) return null;
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
            {result.name}
            <Divider sx={{ borderColor: theme.text, borderWidth: 1 }} />
          </Typography>
        </div>
        <Switch
          checked={result.active}
          onChange={() => {
            update(String(result.company_id), String(result.id), {
              active: !result.active,
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
          data={result}
          type="text"
          dataKey="name"
          label={langPack.deposite_type_name}
          module={module}
          required
        />
      </AccordionDetails>
      <AccordionDetails>
        <EditInput
          module={module}
          data={result}
          type="text"
          dataKey="about"
          label={langPack.description}
        />
      </AccordionDetails>
      <AccordionDetails>
        <EditInput
          module={module}
          data={result}
          type="number"
          dataKey="current_price"
          label={langPack.price}
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
          {langPack.deposite_delete_message.replace(
            ":deposite_type_name:",
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
            label={langPack.deposite_type}
            required
            placeholder={result.name}
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
export default Item;
