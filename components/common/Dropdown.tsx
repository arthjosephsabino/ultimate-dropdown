"use client";

import { SelectOption } from "@/types/option";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * A customizable dropdown component with search functionality.
 *
 * Displays a button that opens a dropdown panel when clicked. Users can search
 * through the options, and selecting an option triggers the `onChange` callback.
 * Clicking outside the dropdown will automatically close it.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.label] - Optional label displayed above the dropdown.
 * @param {SelectOption[]} props.options - Array of options to display in the dropdown.
 * @param {number} [props.value] - ID of the currently selected option.
 * @param {(option: SelectOption) => void} props.onChange - Callback invoked when an option is selected.
 * @param {string} [props.placeholder="Select an option"] - Text to display when no option is selected.
 *
 * @returns {JSX.Element} A dropdown component with search and selection functionality.
 *
 * @example
 * ```tsx
 * const options = [
 *   { id: 1, value: "Option 1" },
 *   { id: 2, value: "Option 2" },
 * ];
 *
 * const [selected, setSelected] = useState<number | undefined>();
 *
 * <Dropdown
 *   label="Choose an option"
 *   options={options}
 *   value={selected}
 *   onChange={(option) => setSelected(option.id)}
 * />
 * ```
 */

interface DropdownProps {
  label?: string;
  options: SelectOption[];
  value?: number;
  onChange: (option: SelectOption) => void;
  placeholder?: string;
}

const Dropdown = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayedText = useMemo(() => {
    const selectedOption = options.find((opt) => opt.id === value);
    if (selectedOption) {
      return selectedOption.value;
    }
    return "Invalid option";
  }, [value, options]);

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;
    return options.filter((opt) =>
      opt.value.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, options]);

  return (
    <div ref={dropdownRef} className="relative w-fit min-w-60">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-100">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{value ? displayedText : placeholder}</span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          {/* Search Input */}
          <div className="p-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-md border text-gray-500 border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>

          {/* Options */}
          <ul className="max-h-60 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = option.id === value;
                return (
                  <li
                    key={option.id}
                    className={`cursor-pointer px-3 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-700 ${
                      isSelected ? "bg-violet-500 text-white" : ""
                    }`}
                    onClick={() => {
                      onChange(option);
                      setOpen(false);
                      setSearch("");
                    }}
                  >
                    {option.value}
                  </li>
                );
              })
            ) : (
              <li className="px-3 py-2 text-sm text-gray-500">
                No results found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
