import { CompanyAbouteDTO } from "./CompanyAbouteDTO";

export interface CompanyDTO {
    name: string;
    about?: string;
    responsible: CompanyAbouteDTO;
}