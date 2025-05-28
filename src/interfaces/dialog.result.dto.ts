import { type SelectChangeEvent } from "@mui/material";
import DeliverDTO, { type DeliversDTO } from "./deliver.dto.ts";
import type PeriodsDTO from "./periods.dto.ts";
import React from "react";
import { DepositeTypeDTO, DepositeTypesDTO } from "./deposite.types.dto.ts";
import { Modules } from "../hooks/Modules/index.tsx";
import { DepositeTypes } from "../classes/deposite.types.ts";
import { SubMenu } from "./content.props.ts";
import { InternalDialogProps } from "./CompanyDialogProps.ts";
export interface DialogSearchResultBaseDTO {
    value: string;
    submitSearch: (name?: string) => void;    
    module: keyof Modules;
}
export interface DialogDeliverSearchResultDTO extends DialogSearchResultBaseDTO {
    results?: DeliversDTO;
}
export interface DialogPeriodSearchResultDTO extends DialogSearchResultBaseDTO {
    results?: PeriodsDTO;
}
export interface DialogDeliverSearchItemProps extends DialogSearchResultBaseDTO {
    deliver: DeliverDTO;
}
export interface DepositeTypeSearchItemProps extends DialogSearchResultBaseDTO {
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
export interface DialogModuleSearchItemProps<M extends keyof Modules> extends DialogSearchResultBaseDTO {
    result: InstanceType<Modules[M]["Entity"]>;
}
export interface DialogModuleSerachResultDTO<M extends keyof Modules> extends DialogSearchResultBaseDTO {
    results?: InstanceType<Modules[M]["DataAdapter"]>;
}
export interface DialogModuleDTO<M extends keyof Modules> extends DailogResultBaseDTO {
    results?: InstanceType<Modules[M]["DataAdapter"]>;
    listedData?: InstanceType<Modules[M]["DataAdapter"]>;
    module: M;   
    subMenu?: SubMenu[];   
    setInternalDialogProcessID: React.Dispatch<React.SetStateAction<InternalDialogProps["process_id"]>>;
    setInternalDialogType: React.Dispatch<React.SetStateAction<string>>;
    setOpenInternalDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface DialogModuleResultDTO<M extends keyof Modules> {
    listedData: InstanceType<Modules[M]["DataAdapter"]>;
    setViewCreate: React.Dispatch<React.SetStateAction<boolean>>;
    module: M
    subMenu?: SubMenu[];   
    setInternalDialogProcessID: React.Dispatch<React.SetStateAction<InternalDialogProps["process_id"]>>;
    setInternalDialogType: React.Dispatch<React.SetStateAction<string>>;
    setOpenInternalDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface DialogDepositeTypeModuleDTO extends DailogResultBaseDTO {
    results?: DepositeTypesDTO;
    listedData?: DepositeTypes;
    module: keyof Modules;
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
