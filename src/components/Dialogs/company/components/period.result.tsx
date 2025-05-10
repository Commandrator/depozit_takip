import React from "react";
import { Paper, Stack } from "@mui/material";
import { theme } from "../../../../index.jsx";
import PeriodDTO from "../../../../interfaces/period.dto.ts";
import Add from "./period.add.tsx";
import PeriodItem from "./period.item.tsx";
/**
 * Arama kısmı ayırılp bu kısım oluşturulacak.
 * Bu kısım dönem listelenmesi için kullanılacak.
 * ! Dönem ve şirket aramak için get kısmına seach kısmı eklenip sorgu kısmına sınır eklenecek.
 * ilk yükleme tarihe göre sıralancak biçimde yapılandırılacak.
 *
 * @param param0
 * @returns
 */
const Result = ({
  periods,
  setViewCreate,
}: {
  periods: PeriodDTO[];
  setViewCreate: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  if (!periods) return null;
  return (
    <Stack spacing={2}>
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
          <Add setViewCreate={setViewCreate} />
        )}
      </Stack>
    </Stack>
  );
};
export default Result;
