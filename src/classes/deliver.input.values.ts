import { langPack } from "..";
import { type DeliverInputDTO, type DeliverInputErrorDTO } from "../interfaces/period.dialog.input.dto";
export default class DeliverInput implements DeliverInputDTO {
  employee: string = "";
  mail: string = "";
  active: boolean = false;

  constructor(data: DeliverInputDTO) {
    if (data.employee) this.employee = data.employee;
    if (data.mail) this.mail = data.mail;
    if (typeof data.active === "boolean") this.active = data.active;
  }
}
export class DeliverInputError implements DeliverInputErrorDTO {
  employee: string = "";
  mail: string = "";

  private regex = {
    employee: /^[a-zA-ZçğıöşüÇĞİÖŞÜ\s]{3,50}$/,
    mail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  };

  constructor(data: DeliverInputErrorDTO) {
    if (!data.employee || !this.regex.employee.test(data.employee.trim())) {
      this.employee = langPack.enter_employee_name;
    }
    // mail boş değilse ve geçersizse hata
    if (data.mail && !this.regex.mail.test(data.mail.trim())) {
      this.mail = langPack.invalid_mail_format;
    }
  }

  hasError(): boolean {
    return !!(this.employee || this.mail);
  }
}
