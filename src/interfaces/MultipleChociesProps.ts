import FilterItem from "./FilterItem";
interface MultipleChociesProps {
  title: string;
  view: boolean;
  items: FilterItem[];
  filters: string[];
  setFilters: (filters: any) => void;
  notFount: React.ReactNode;
  id: string;
}
export default MultipleChociesProps;