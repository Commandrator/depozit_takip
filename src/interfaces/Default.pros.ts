import { Modules } from "../hooks/Modules/index.tsx";
export default interface DefaultProps {
    readonly className?: string;
}
export interface DeaultInterface<M> {
  result?: M;
  module: keyof Modules;
}