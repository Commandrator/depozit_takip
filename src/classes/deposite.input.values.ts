import { langPack } from "..";
import { type DepositeTypeInputDTO, type DepositeTypeErrorDTO } from "../interfaces/period.dialog.input.dto";
/**
 * ### DepositeTypeInput
 * ---
 * about ve current_price'ın undefined karşılaştırılmasının sebebi
 * kullanıcının bu bilgileri silmek null kullanması durumunda işlemin
 * sınıfa işlenmesini sağlamak. 
 * 
 * Aynı durum actice içinde geçerli, false geldiği zaman varsayılan
 * değerle çalışmasına sebep oluyor.
 */
export class DepositeTypeInput implements DepositeTypeInputDTO {
    name: string = "";
    about: string = "";
    current_price: number = 0;
    active: boolean = true;
    constructor(data: Partial<DepositeTypeInputDTO>) {
        if (data.name) this.name = data.name;
        if (data.about !== undefined) this.about = data.about;
        if (typeof data.active === "boolean") this.active = data.active;
        if (data.current_price !== undefined) this.current_price = data.current_price;
    }
}
/**
 * ### DepositeTypeInputtError
 * ---
 * Regex kontrolünün ayrı yapmamın sebebi iki duruma bağlı çalışasıdır.
 * Bu durumların fonksiyon haline getirlimesini bu nesne yapısı için
 * gereksiz gördüğüm için yapmadım.
 * 
 * #### HashError
 * ---
 * Yüklenen değere göre mesajın doldurulup doldurulmadığını testetmek.
 */
export class DepositeTypeInputtError implements DepositeTypeErrorDTO {
    name: string = "";
    about: string = "";
    current_price: string = "";
    private regex = {
        name: /^[a-zA-ZÇŞĞÜÖİçşğüöı0-9\s().'-]{1,50}$/,
        about: /^[a-zA-ZÇŞĞÜÖİçşğüöı0-9\s.,;:!?'"\-()]{0,500}$/,
        current_price: /^\d+(\.\d{1,2})?$/,
    };
    constructor(data: Partial<DepositeTypeErrorDTO>) {
        if (!data.name || !this.regex.name.test(data.name.trim())) {
            this.name = langPack.enter_deposite_type_name;
        }
        if (data.about && !this.regex.about.test(data.about.trim())) {
            this.about = langPack.enter_deposite_type_about;
        }
        if (data.current_price && !this.regex.current_price.test(String(data.current_price).trim())) {
            this.current_price = langPack.enter_current_price;
        }
    }
    hasError(): boolean {
        return !!(this.name || this.about || this.current_price);
    }
}
export default DepositeTypeInput;