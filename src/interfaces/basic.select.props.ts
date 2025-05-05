import { SelectChangeEvent } from "@mui/material/Select";
export default interface BasicSelectProps {
    range: string,
    handleChangeRange: (event: SelectChangeEvent) => void;
}