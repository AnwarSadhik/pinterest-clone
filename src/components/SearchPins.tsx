"use client";

import React from "react";
import { BsSearch } from "react-icons/bs";
import { Input } from "./ui/input";
import useSearchStore from "@/store/search";

export default function SearchPins() {
  const { searchTerm, setSearchTerm } = useSearchStore();

  console.log(searchTerm);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex items-center w-full">
      <BsSearch
        className="relative left-[2.5rem] md:relative md:left-[2.6rem] text-black font-extrabold"
        size={15}
      />
      <Input
        onChange={handleSearchChange}
        placeholder="Search"
        className=" text-black md:block font-semibold w-auto md:w-full rounded-full ml-4 pl-8 py-5  bg-[#e9e9e9] outline-none"
      />
    </div>
  );
}
