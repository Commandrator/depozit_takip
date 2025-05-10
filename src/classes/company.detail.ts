class Responsible {
    id: string;
    username: string;
    email: string;
    phone_number: string | null;
    address: string | null;
    created_at: string;
    updated_at: string;

    constructor(responsibleData: {
        id: string;
        username: string;
        email: string;
        phone_number: string | null;
        address: string | null;
        created_at: string;
        updated_at: string;
    }) {
        this.id = responsibleData.id;
        this.username = responsibleData.username;
        this.email = responsibleData.email;
        this.phone_number = responsibleData.phone_number;
        this.address = responsibleData.address;
        this.created_at = responsibleData.created_at;
        this.updated_at = responsibleData.updated_at;
    }
}

class CompanyDetail {
    name: string;
    about: string;
    responsible: Responsible;

    constructor(companyData: {
        name: string;
        about: string;
        responsible: {
            id: string;
            username: string;
            email: string;
            phone_number: string | null;
            address: string | null;
            created_at: string;
            updated_at: string;
        };
    }) {
        this.name = companyData.name;
        this.about = companyData.about;
        this.responsible = new Responsible(companyData.responsible);
    }
}
export default CompanyDetail;