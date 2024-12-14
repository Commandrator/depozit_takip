import React, { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import PropTypes from "prop-types";

interface FilterItem {
  label: string;
  id: string;
  value: string;
}

interface MultipleChociesProps {
  title: string;
  view: boolean;
  items: FilterItem[];
  filters: string[];
  setFilters: (filters: any) => void;
  notFount: React.ReactNode;
  id: string;
}

const MultipleChocies: React.FC<MultipleChociesProps> = ({ title, view, items, filters, setFilters, notFount, id }) => {
  const [currentView, setView] = useState<boolean>(view);

  // Toggle the view state
  const handleView = () => {
    setView((prev) => !prev);
  };

  // Handle filter change, updates the selected filters
  const handleFilterChange = (filterValue: string) => {
    // Directly set the new array of filters
    setFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      const index = newFilters.indexOf(filterValue);
      if (index !== -1) {
        newFilters.splice(index, 1); // Remove filter if already selected
      } else {
        newFilters.push(filterValue); // Add filter if not selected
      }
      return newFilters; // Return the updated filters array
    });
  };

  return (
    <div className="px-2">
      <div className="flex justify-between items-center mb-1">
        <div
          onClick={handleView}
          className="text-sm text-gray-600 cursor-pointer p-1"
        >
          <b>{title}</b>
        </div>
        <div
          className="cursor-pointer p-1 rounded-full hover:text-blue-600"
          onClick={handleView}
        >
          {currentView ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </div>
      </div>

      {currentView ? items.length ? (
        <div
          id="select-items"
          className="border border-black w-full min-h-[25px] max-h-[200px] overflow-y-auto"
        >
          <ul>
            {items.map((item, i) => (
              <CreateSelectItemsWithCheckbox
                label={item.label}
                checked={filters.includes(item.value)}
                value={item.value}
                key={i}
                onChange={handleFilterChange} // Pass the handler to child component
              />
            ))}
          </ul>
        </div>
      ) : (
        notFount
      ): null}
    </div>
  );
};

interface CreateSelectItemsWithCheckboxProps {
  checked: boolean;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const CreateSelectItemsWithCheckbox: React.FC<CreateSelectItemsWithCheckboxProps> = ({
  checked,
  label,
  value,
  onChange,
}) => {
  const handleChecked = () => {
    onChange(value); // Trigger filter change in parent
  };

  if (label === "") {
    return (
      <li className="flex items-center animate-pulse w-24 h-3 bg-gray-400 rounded-full m-1" />
    );
  } else {
    return (
      <li className="flex items-center">
        <input
          type="checkbox"
          id={`checkboxItem-${value}`} // Unique ID for each item
          value={value}
          onChange={handleChecked}
          checked={checked}
        />
        <label
          className="ml-2"
          htmlFor={`checkboxItem-${value}`} // Unique ID for each item
        >
          {label}
        </label>
      </li>
    );
  }
};

CreateSelectItemsWithCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export { MultipleChocies };