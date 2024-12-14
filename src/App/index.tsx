import { MultipleChocies } from "../components/Filtres/index.tsx";
import { SearchBox } from "../components/SearchBox.tsx";
import React, { useState } from "react"
const App = () => {
    const [filters, setFilters] = useState<string[]>(['all']);

    const items = [
      { label: "Hepsi", id: "1", value: "all" },
      { label: "İsim Soyisim", id: "2", value: "nameSurname" },
      { label: "Kimlik Numarası", id: "3", value: "tcId" },
      { label: "Vergi Numarası", id: "4", value: "taxId" },
      { label: "Telefon Numarası", id: "5", value: "phone" }
    ];
    return (
        <div className="flex h-screen p-1">
            <div
                id="filter"
                className="min-w-[200px] max-w-[300px] h-full border border-black px-2">
                    <MultipleChocies
                        id="searchBoxFilter"
                        title="Arama Filtresi"
                        filters={filters}
                        setFilters={setFilters}
                        items={items}
                        view={false}
                        notFount={<div>Bulunamadı</div>}/>

                </div>
            <div
                className="flex justify-center items-start w-full h-full border ml-1 border-black p-1"
                id="list">
                <div className="w-full flex flex-col">
                    <div
                        id="searchBox"
                        className="w-full min-h-[30px] border border-black mb-1">
                        <SearchBox filters={filters}/>
                    </div>
                    <div
                        id="table"
                        className="border border-black w-full mt-1">
                        Tablo İçeriği
                    </div>
                </div>
            </div>

        </div>
    )
}
export default App;