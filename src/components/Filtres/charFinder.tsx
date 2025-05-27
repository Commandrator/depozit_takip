import React from "react";
const highlightSearchTerm = (text: string, searchTerm: string) => {
  const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <span key={`${part}-${index}`} className="font-bold">
        {part}
      </span>
    ) : (
      <span key={`${part}-${index}`} className="">
        {part}
      </span>
    )
  );
};
export const isExistTerm = (text: string, searchTerm: string) => {
  const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
  return parts.find(part => part.toLowerCase() === searchTerm.toLowerCase())
}
export default highlightSearchTerm;