import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CategoryIcon from '@mui/icons-material/Category';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Grid,
  Button,
  AccordionActions,
  TextField,
  Switch,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import { langPack, theme } from "../../../../../index.jsx";
import useDialogContext from "../../../../../hooks/useDilaogContext.tsx";
import { DeaultInterface } from "../../../../../interfaces/Default.pros.ts";
import { CustomerDTO } from "../../../../../interfaces/customers.dto.ts";
const InfoRow = ({ label, value }) => (
  <Typography variant="body2" sx={{ color: theme.text }}>
    <span className="text-gray-400">{label}:</span> {value}
  </Typography>
);
const CustomerItem: React.FC<DeaultInterface<CustomerDTO>> = ({
  result,
  module,
  setOpenInternalDialog,
  setInternalDialogType,
  setInternalDialogProcessID
}): JSX.Element | null => {
  const { handleDeleteInput, deleteOption, delete_data, update } =
    useDialogContext({
      selectedCompanyId: String(result?.company_id ?? ""),
      module,
    });
  const dicount_type = {
    fixed: langPack.fixed,
    percentage: langPack.percentage,
  };
  const handleOpen = (dialog_type, process_id) => {
    setInternalDialogType(dialog_type)
    setInternalDialogProcessID(process_id)
    setOpenInternalDialog(true)
  }
  if (!result) return null;
  return (
    <Accordion
      sx={{
        backgroundColor: theme.card.backgroundColor,
        color: theme.text,
        borderRadius: 2,
        border: `1px solid ${theme.border}`,
        "&.Mui-expanded": {
          backgroundColor: theme.background,
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
          position: "relative",
        }}
      >
        <div>
          <Typography component="span" sx={{ flexGrow: 1 }}>
            {result.name_surname}
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

      <AccordionDetails sx={{ px: 2, pt: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <InfoRow label={langPack.adress} value={result.adres} />
            <InfoRow label={langPack.phone} value={result.phone} />
            <InfoRow label={langPack.tc_id} value={result.tc_id} />
            <InfoRow label={langPack.tax_id} value={result.tax_id} />
            <InfoRow label={langPack.note} value={result.note} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoRow
              label={langPack.customer_type}
              value={result.customer_type.name}
            />
            <InfoRow
              label={langPack.discount}
              value={result.customer_type.discount}
            />
            <InfoRow
              label={langPack.discount_type}
              value={dicount_type[result.customer_type.discount_type]}
            />
            <InfoRow
              label={langPack.last_update_date}
              value={new Date(result.last_update).toLocaleDateString()}
            />
            <InfoRow
              label={langPack.creation_date}
              value={new Date(result.creation_date).toLocaleDateString()}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
      <AccordionDetails sx={{ px: 2 }}>
        <Typography
          component={ReactMarkdown}
          variant="body2"
          sx={{ color: theme.text }}
        >
          {langPack.customer_delete_message.replace(
            ":customer:",
            result.name_surname
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
        <div className="flex flex-col sm:flex-row justify-between w-full gap-2">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              className="flex-shrink-0 w-full md:w-auto"
              onClick={() => handleOpen("deposite",result.id)}
              startIcon={<CategoryIcon/>}
            >
              {langPack.deposite_transactions}
            </Button>
            <Button
              variant="outlined"
              color="inherit" 
              size="small"
              className="flex-shrink-0 w-full md:w-auto"
              onClick={() => handleOpen("customer-edit",result.id)}
            >
              {langPack.edit}
            </Button>
          </div>
          <form
            onSubmit={(e) =>
              delete_data(String(result.company_id), String(result.id), e)
            }
            className="flex flex-col sm:flex-row-reverse items-center gap-2"
          >
            <Button
              variant="contained"
              disabled={deleteOption !== result.name_surname}
              className="opacity-70 hover:opacity-100 transition-opacity duration-300 flex-shrink-0 w-full sm:w-auto"
              color="error"
              type="submit"
            >
              {langPack.delete}
            </Button>
            <div className="flex-grow sm:flex-grow-0 sm:w-3/5 w-full sm:min-w-[200px]">
              <TextField
                size="small"
                label={langPack.customer}
                required
                placeholder={result.name_surname}
                onChange={handleDeleteInput}
                value={deleteOption}
                fullWidth
                sx={{
                  "& .MuiInputBase-input::placeholder": { fontSize: "10px" },
                }}
              />
            </div>
          </form>
        </div>
      </AccordionActions>
    </Accordion>
  );
};
export default React.memo(CustomerItem);
