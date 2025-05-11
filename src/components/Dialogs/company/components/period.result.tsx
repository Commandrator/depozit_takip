import React from "react";
import { Paper, Tooltip, Button, Stack } from "@mui/material";
import { theme, langPack } from "../../../../index.jsx";
import PeriodDTO from "../../../../interfaces/period.dto.ts";
import { Add as AddIcon } from "@mui/icons-material";
import Add from "./period.add.tsx";
import PeriodItem from "./period.item.tsx";
import Loader from "./loader.tsx";
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
  isLoaded,
}: {
  periods?: PeriodDTO[];
  setViewCreate: React.Dispatch<React.SetStateAction<boolean>>;
  isLoaded: boolean;
}) => {
  if (!isLoaded) return <Loader />;
  if (!periods) return null;
  return (
    <Stack spacing={2}>
      <Paper
        elevation={3}
        sx={{
          position: "sticky", // yapıştır
          top: 0,
          zIndex: 10, // diğer içeriklerin üstünde kalsın
          borderRadius: "12px",
          backgroundColor: theme.card.backgroundColor,
          color: theme.text,
          border: `1px solid ${theme.border}`,
          p: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <form>arama</form>
          <Tooltip title={langPack.create}>
            <Button
              sx={{ color: theme.menuItem.color }}
              onClick={() => {
                setViewCreate((prev) => !prev);
              }}
              startIcon={<AddIcon />}
              color="inherit"
              variant="outlined"
              size="small"
            >
              {langPack.add_a_new_period}
            </Button>
          </Tooltip>
        </Stack>
      </Paper>

      <Paper
        elevation={3}
        className="custom-scrollbar"
        sx={{
          p: 2,
          borderRadius: "12px",
          backgroundColor: theme.card.backgroundColor,
          color: theme.text,
          border: `1px solid ${theme.border}`,
        }}
      >
        <Stack spacing={2}>
          {periods.length > 0 ? (
            periods.map((period) => (
              <PeriodItem key={period.id} period={period} />
            ))
          ) : (
            <Add setViewCreate={setViewCreate} />
          )}
        </Stack>
      </Paper>
    </Stack>
  );
};
export default Result;
