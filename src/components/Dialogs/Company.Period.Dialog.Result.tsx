import React from "react";
import { DialogContent, Paper, Stack } from "@mui/material";
import { theme } from "../../index.jsx";
import PeriodItem from "./Company.Period.Dialog.Item.tsx";
import PeriodDTO from "../../interfaces/period.dto.ts";
import AddAPeriod from "./Company.Period.Dialog.AddAPeriod.tsx";
/**
 * Arama kısmı ayırılp bu kısım oluşturulacak.
 * Bu kısım dönem listelenmesi için kullanılacak.
 * ! Dönem ve şirket aramak için get kısmına seach kısmı eklenip sorgu kısmına sınır eklenecek.
 * ilk yükleme tarihe göre sıralancak biçimde yapılandırılacak.
 *
 * @param param0
 * @returns
 */
const PeriodListResult = ({
  periods,
  setViewCreate,
}: {
  periods: PeriodDTO[] | undefined;
  setViewCreate: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <DialogContent
      className="space-y-5"
      sx={{
        backgroundColor: theme.background,
        color: theme.text,
        overflow: "hidden",
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
      <Stack
        spacing={2}
        component={Paper}
        className="custom-scrollbar"
        elevation={3}
        sx={{
          p: 2,
          borderRadius: "12px",
          backgroundColor: theme.card.backgroundColor,
          color: theme.text,
          border: `1px solid ${theme.border}`,
          overflow: "auto",
          maxHeight: "400px", // yüksekliği sınırla
          overflowY: "auto", // sadece bu alan kayabilir
        }}
      >
        {periods?.length > 0 ? (
          periods.map((period) => (
            <PeriodItem key={period.id} period={period} />
          ))
        ) : (
          <AddAPeriod setViewCreate={setViewCreate} />
        )}
      </Stack>
    </DialogContent>
  );
};
export default PeriodListResult;
