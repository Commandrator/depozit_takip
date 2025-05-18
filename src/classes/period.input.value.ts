import { langPack } from "..";
import type PeriodInputDTO from "../interfaces/period.dialog.input.dto";
import type { PeriodInputErrorDTO } from "../interfaces/period.dialog.input.dto";
export default class PeriodInput implements PeriodInputDTO {
    private currentYear = new Date().getFullYear();
    private nextYear = this.currentYear + 1;
    deadline: string = new Date(new Date().setFullYear(this.nextYear))
        .toISOString()
        .split("T")[0];
    name: string = `${this.currentYear} - ${this.nextYear} ${langPack.working_period}`;

    constructor(data: Partial<PeriodInputDTO>) {
        if (data.deadline) this.deadline = data.deadline;
        if (data.name) this.name = data.name;
    }
}

export class PeriodInputError implements PeriodInputErrorDTO {
    deadline: string = "";
    name: string = "";

    private regex = {
        deadline: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
        name: /^[a-zA-ZçğıöşüÇĞİÖŞÜ0-9 -]+$/
    };

    constructor(data: Partial<PeriodInputErrorDTO>) {
        if (!data.deadline || !this.regex.deadline.test(data.deadline.trim())) {
            this.deadline = langPack.deadline;
        }
        if (data.name && !this.regex.name.test(data.name.trim())) {
            this.name = langPack.enter_letters_and_numbers_only;
        }
    }

    hasError(): boolean {
        return !!(this.deadline || this.name);
    }
}
