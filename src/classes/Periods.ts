import PeriodDTO from "../interfaces/period.dto";
import PeriodsDTO from "../interfaces/periods.dto";
/**
 * Priot tarih formtlaması için sınıf oluşturulacak.
 */
export class Period {
    id: number;
    company_id: number;
    name: string;
    creation_date: string;
    last_update: string;
    deadline: string;
    private formatDate(dateStr: string): string {
        return new Date(dateStr).toISOString().slice(0, 10);
    }
    constructor(parameters: PeriodDTO) {
        if (parameters) {
            this.id = parameters.id;
            this.company_id = parameters.company_id;
            this.name = parameters.name;
            this.creation_date = this.formatDate(parameters.creation_date);
            this.last_update = this.formatDate(parameters.last_update);
            this.deadline = this.formatDate(parameters.deadline);
        }
    }
}
export default class Periods {
    periods: PeriodDTO[] = [];
    total: number = 0;
    constructor(parameters: PeriodsDTO) {
        if (parameters) {
            this.total = parameters.total;
            this.periods = parameters.periods.map((p: PeriodDTO) => new Period(p));
        }
    }
    getUniquePeriods() {
        const uniquePeriods = this.periods.reduce((acc: PeriodDTO[], period: PeriodDTO) => {
            if (!acc.some(item => item.name === period.name)) {
                acc.push(period);
            }
            return acc;
        }, []);
        return new Periods({ periods: uniquePeriods, total: this.total });
    }
}
