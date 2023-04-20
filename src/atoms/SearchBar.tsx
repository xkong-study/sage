import React, { useCallback, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Transition } from "@headlessui/react";
import { usePrevious } from "../hooks";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSearchChange?: (message: string) => void;
}

export default function SearchBar({
  className,
  placeholder,
  onSearchChange,
}: SearchBarProps) {
  const [search, setSearch] = useState<string>("");
  const prevSearch = usePrevious<string>(search);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentSearch = e.target.value;
    setSearch(currentSearch);
    if (search.length < 3 || (prevSearch?.length || 0) > currentSearch.length)
      return;
    onSearchChange?.(search);
  };

  const clearSearch = useCallback(() => {
    setSearch("");
  }, []);

  return (
    <div className={className}>
      <label
        htmlFor="search"
        className="block text-sm font-medium leading-6 text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative flex w-full justify-between group">
        <input
          type="text"
          name="search"
          className="block text-sm w-full rounded-full shadow-sm ring-1 ring-gray-400 focus:ring-2 focus:ring-gray-500 border-0 py-2 text-gray-600 placeholder:text-gray-400 leading-6"
          placeholder={placeholder ?? "Search"}
          onChange={handleSearchChange}
          value={search}
        />
        <Transition
          show={search.length === 0}
          enter="transition-opacity duration-75 delay-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <button>
            <MagnifyingGlassIcon
              className="absolute h-full inset-y-0 right-4 w-5 text-gray-400"
              aria-hidden="true"
            />
          </button>
        </Transition>
        <Transition
          show={search.length > 0}
          enter="transition-opacity duration-75 delay-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <button onClick={clearSearch}>
            <XMarkIcon
              className="absolute h-full inset-y-0 right-4 w-5 text-red-800"
              aria-hidden="true"
            />
          </button>
        </Transition>
      </div>
    </div>
  );
}
