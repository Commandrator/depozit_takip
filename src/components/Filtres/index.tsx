import React, { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import PropTypes from "prop-types";
import MultipleChociesProps from "../../interfaces/MultipleChociesProps";
import CreateSelectItemsWithCheckboxProps from "../../interfaces/CreateSelectItemsWithCheckboxProps";
const MultipleChocies: React.FC<MultipleChociesProps> = ({
  title,
  view,
  items,
  filters,
  setFilters,
  notFount,
  id,
}) => {
  const [currentView, setView] = useState<boolean>(view);

  // Toggle the view state
  const handleView = () => {
    setView((prev) => !prev);
  };

  // Handle filter change, updates the selected filters
  const handleFilterChange = (filterValue: string) => {
    setFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      const index = newFilters.indexOf(filterValue);
      if (index !== -1) {
        newFilters.splice(index, 1); // Remove filter if already selected
      } else {
        newFilters.push(filterValue); // Add filter if not selected
      }
      return newFilters;
    });
  };

  // Handle 'Select All' functionality
  const handleSelectAll = () => {
    // Check if all filters are currently selected
    if (filters.length === items.length) {
      // If all are selected, clear all
      setFilters([]);
    } else {
      // If not all are selected, select all
      const allValues = items.map((item) => item.value);
      setFilters(allValues);
    }
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

      {currentView ? (
        items.length ? (
          <div
            id="select-items"
            className="border border-black w-full min-h-[25px] max-h-[200px] overflow-y-auto"
          >
            <ul>
              <CreateSelectItemsWithCheckbox
                label={
                  filters.length === items.length
                    ? "Seçimleri Kaldır"
                    : "Hepsini Seç"
                }
                checked={filters.length === items.length}
                value="all"
                onChange={handleSelectAll}
              />
              {/* Other Items */}
              {items.map((item) => (
                <CreateSelectItemsWithCheckbox
                  label={item.label}
                  checked={filters.includes(item.value)}
                  value={item.value}
                  key={item.id}
                  onChange={handleFilterChange}
                />
              ))}
            </ul>
          </div>
        ) : (
          notFount
        )
      ) : null}
    </div>
  );
};

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
