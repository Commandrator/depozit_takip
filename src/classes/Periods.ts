import PeriodDTO from "../interfaces/period.dto";
import PeriodsDTO from "../interfaces/periods.dto";
/**
 * Priot tarih formtlaması için sınıf oluşturulacak.
 */
function formatDate(dateStr: string): string {
  return new Date(dateStr).toISOString().slice(0, 10);
}

export class Period implements PeriodDTO {
  id: number;
  company_id: number;
  name: string;
  creation_date: string;
  last_update: string;
  deadline: string;

  constructor(params: PeriodDTO) {
    if (params.id) this.id = params.id;
    if (params.company_id) this.company_id = params.company_id;
    if (params.name) this.name = params.name;
    if (params.creation_date) this.creation_date = formatDate(params.creation_date);
    if (params.last_update) this.last_update = formatDate(params.last_update);
    if (params.deadline) this.deadline = formatDate(params.deadline);
  }
}
export class Periods {
    results: PeriodDTO[] = [];
    total: number = 0;
    constructor(parameters: PeriodsDTO) {
        if (parameters) {
            this.total = parameters.total;
            this.results = parameters.periods.map((p: PeriodDTO) => new Period(p));
        }
    }
    normalize(str: string): string {
        return str.trim().toLocaleLowerCase("tr");
    }
    getUnique(): Periods {
        const seenNames = new Set<string>();
        const uniquePeriods = this.results.filter(deposit => {
            const normalized = this.normalize(deposit.name);
            if (seenNames.has(normalized)) {
                return false;
            }
            seenNames.add(normalized);
            return true;
        });
        return new Periods({ periods: uniquePeriods, total: this.total });
    }
}
export default Periods