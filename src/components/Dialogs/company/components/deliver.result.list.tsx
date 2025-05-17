import Add from "./deliver.add.tsx";
import React from "react";
import DeliverItem from "./deliver.item.tsx";
import { DialogDeliverResultList } from "../../../../interfaces/dialog.result.dto.ts";
const ResultList: React.FC<DialogDeliverResultList> = React.memo(
  ({ results, setViewCreate }): React.ReactNode => {
    if (results.delivers.length === 0)
      return <Add setViewCreate={setViewCreate} />;
    return results.delivers.map((deliver) => (
      <DeliverItem key={deliver.id} deliver={deliver} />
    ));
  }
);

export default ResultList;
