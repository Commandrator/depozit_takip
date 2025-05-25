import { langPack } from "..";
import { type CustomerTypeInputDTO , type CustomerTypeErrorDTO } from "../interfaces/period.dialog.input.dto";
export class CustomerTypeInput implements CustomerTypeInputDTO  {
    name: string;
    discount: number = 0;
    default_deadline_day?: number = 30;
    discount_type: string = "fixed";
    constructor(data: Partial<CustomerTypeInputDTO>) {
        if (data.name) this.name = data.name;
        if (data.discount !== undefined) this.discount = data.discount;
        if (data.default_deadline_day !== undefined) this.default_deadline_day = data.default_deadline_day;
        if (data.discount_type !== undefined) this.discount_type = data.discount_type;
    }
}
export class CustomerTypeInputtError implements CustomerTypeErrorDTO {
    name: string = '';
    discount: string = '';
    default_deadline_day: string = '';

    private regex = {
        name: /^[a-zA-ZÇŞĞÜÖİçşğüöı0-9\s().'-]{1,50}$/,
        discount: /^\d+(\.\d{1,3})?$/,
        default_deadline_day: /^\d+$/
    };

    constructor(data: Partial<CustomerTypeInputDTO >) {
        if (!data.name || !this.regex.name.test(data.name.trim())) {
            this.name = langPack.customer_type_name_input_error;
        }
        if (data.discount !== undefined && !this.regex.discount.test(String(data.discount).trim())) {
            this.discount = langPack.customer_type_discount_input_error;
        }
        if (data.default_deadline_day !== undefined &&
            !this.regex.default_deadline_day.test(String(data.default_deadline_day).trim())) {
            this.default_deadline_day = langPack.customer_type_default_deadline_day_input_error;
        }
    }

    hasError(): boolean {
        return !!(this.name || this.discount || this.default_deadline_day);
    }
}
