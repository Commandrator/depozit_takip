import PeriodDTO from "../interfaces/period.dto";

export default class Period {
    id: number;
    company_id: number;
    name: string;
    creation_date: string;
    last_update: string;
    deadline: string;
    constructor(data: PeriodDTO) {
        this.id = data.id;
        this.company_id = data.company_id;
        this.name = data.name;
        this.creation_date = this.formatDate(data.creation_date);
        this.last_update = this.formatDate(data.last_update);
        this.deadline = this.formatDate(data.deadline);
    }
    private formatDate(dateStr: string): string {
        return new Date(dateStr).toISOString().slice(0, 10); // YYYY-MM-DD
    }
}
