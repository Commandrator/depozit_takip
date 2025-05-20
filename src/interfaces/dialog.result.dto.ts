import { type SelectChangeEvent } from "@mui/material";
import DeliverDTO, { type DeliversDTO } from "./deliver.dto.ts";
import type PeriodsDTO from "./periods.dto.ts";
import React from "react";
import { DepositeTypeDTO, DepositeTypesDTO } from "./deposite.types.dto.ts";
import { Modules } from "../hooks/Modules/index.tsx";
import { DepositeTypes } from "../classes/deposite.types.ts";
export interface DialogSearchResultBaseDTO {
    value: string;
    submitSearch: (name?: string) => void;
}
export interface DialogDeliverSearchResultDTO extends DialogSearchResultBaseDTO {
    results?: DeliversDTO;
}
export interface DialogPeriodSearchResultDTO extends DialogSearchResultBaseDTO {
    results?: PeriodsDTO;
}
export interface DialogDeliverSearchItemProps extends DialogSearchResultBaseDTO{
    deliver: DeliverDTO;
}
export interface DepositeTypeSearchItemProps extends DialogSearchResultBaseDTO{
    result: DepositeTypeDTO;
}
export interface DailogResultBaseDTO extends DialogSearchResultBaseDTO {
    setViewCreate: React.Dispatch<React.SetStateAction<boolean>>;
    isLoaded: boolean;
    page: number;
    range: string;
    handleChangeRange: (event: SelectChangeEvent<string>) => void;
    handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleClear: () => void;
    viewResult: boolean;
    searchRef: React.RefObject<HTMLDivElement>;
    handleClickOutside: (event: MouseEvent) => void;
}
export interface DialogDepositeTypeModuleDTO extends DailogResultBaseDTO {
    results?: DepositeTypesDTO;
    listedData?: DepositeTypes;
    module:keyof Modules;
}

export interface DialogResultDTO extends DailogResultBaseDTO {
    periods?: PeriodsDTO;
    results?: PeriodsDTO;
}
export interface DialogDeliverResultDTO extends DailogResultBaseDTO {
    delivers?: DeliversDTO;
    results?: DeliversDTO;
}
export interface DialogResultListBase {
    setViewCreate: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface DialogDeliverResultList extends DialogResultListBase {
    results: DeliversDTO;
}
