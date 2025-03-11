import CompaniesDTO from "../interfaces/User.Companies.dto";
import CompanyDTO from "../interfaces/User.Company.DTO";

export class Companies {
    id: string; // Şirket ID'si
    phone_number: string; // Telefon Numarası
    address: string; // Adres
    created_at: string; // Oluşturulma Tarihi
    updated_at: string; // Güncellenme Tarihi
    companies: CompanyDTO[]; // Şirketlerin Listesi (Birden fazla şirket içerebilir)
    username: string;  // Bu özellik eklendi
    email: string;     // Bu özellik eklendi
    constructor(parameters: CompaniesDTO) {
        if (parameters) {
            this.id = parameters.id;
            this.phone_number = parameters.phone_number; // Parametreden alıyoruz
            this.address = parameters.address; // Parametreden alıyoruz
            this.created_at = parameters.created_at; // Parametreden alıyoruz
            this.updated_at = parameters.updated_at; // Parametreden alıyoruz
            this.companies = parameters.companies; // Birden fazla şirket olabilir, array olarak alıyoruz
            this.username = parameters.username; // Parametreden alınıyor
            this.email = parameters.email;       // Parametreden alınıyor
        }
    }
}
