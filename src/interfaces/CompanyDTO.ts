import { CompanyAbouteDTO } from "./CompanyAbouteDTO";

export interface CompanyDTO {
    id?: number;
    name: string;
    about?: string;
    responsible: CompanyAbouteDTO;
}