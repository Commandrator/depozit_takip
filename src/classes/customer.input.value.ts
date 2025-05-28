import { langPack } from "..";
import { type CustomerInputDTO, type CustomerErrorDTO } from "../interfaces/period.dialog.input.dto";
export class CustomerInput implements CustomerInputDTO  {
    name_surname: string = "";
    note: string = "";
    tc_id: string = "";
    tax_id: string = "";
    phone: string = "";
    adres: string = "";
    customer_type_id: string = "";
    active:boolean = true;
    constructor(data: Partial<CustomerInputDTO>) {
        if (data.name_surname !== undefined) this.name_surname = data.name_surname;
        if (data.note !== undefined) this.note = data.note;
        if (data.tc_id !== undefined) this.tc_id = data.tc_id;
        if (data.tax_id !== undefined) this.tax_id = data.tax_id;
        if (data.phone !== undefined) this.phone = data.phone;
        if (data.adres !== undefined) this.adres = data.adres;
        if (data.customer_type_id !== undefined) this.customer_type_id = String(data.customer_type_id);
        if (data.active !== undefined) this.active = data.active;
    }
}
export class CustomerInputErrorDTO implements CustomerErrorDTO {
    name_surname: string = "";
    note: string = "";
    tc_id: string = "";
    tax_id: string = "";
    phone: string = "";
    adres: string = "";
    customer_type: string = "";
    private regex = {
        name_surname: /^[a-zA-ZÇŞĞÜÖİçşğüöı\s'-]{2,50}$/,
        note: /^[\s\S]{0,500}$/,
        tc_id: /^[1-9]\d{10}$/,
        tax_id: /^\d{10}$/, 
        phone: /^\d{10}$/,
        adres: /^[\s\S]{1,500}$/
    };
    constructor(data: Partial<CustomerInputDTO >) {
        if (!data.name_surname || !this.regex.name_surname.test(data.name_surname.trim())) {
            this.name_surname = langPack.customer_name_surname_error;
        }
        if (data.note && !this.regex.note.test(String(data.note).trim())) {
            this.note = langPack.customer_note_error;
        }
        if (data.tc_id && !this.regex.tc_id.test(String(data.tc_id).trim())) {
            this.tc_id = langPack.customer_tc_id_error;
        }
        if (data.tax_id && !this.regex.tax_id.test(String(data.tax_id).trim())) {
            this.tax_id = langPack.customer_tax_id_error;
        }
        if (!data.phone || !this.regex.phone.test(data.phone.trim())) {
            this.phone = langPack.customer_phone_error;
        }
        if (data.adres && !this.regex.adres.test(String(data.adres).trim())) {
            this.adres = langPack.customer_adres_error;
        }
        if (!data.customer_type_id){
            this.customer_type = langPack.customer_customer_type_error
        }
    }
    hasError(): boolean {
        return !!(this.name_surname || this.note || this.tc_id || this.tax_id || this.phone || this.adres);
    }
}
