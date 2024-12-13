"use client";

import { formUrlQuery } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchForm = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(query);

  const router = useRouter();

  useEffect(() => {
    if (searchQuery) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "query",
        value: searchQuery,
      });

      // Update the URL without reloading the page.
      router.push(newUrl, { scroll: false });
    }
  }, [searchQuery, searchParams, router]);

  return (
    <div className="flex bg-blue-100 w-full rounded-md p-2 items-center justify-center">
      <SearchIcon />
      <input
        type="text"
        value={searchQuery}
        placeholder="Search..."
        className="flex-1 px-4 py-2 border border-input bg-transparent rounded-md focus:outline-none"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="ml-2 text-white font-medium py-2 px-4 rounded-md shadow-md bg-blue-400 hover:bg-blue-500 transition-all transform hover:scale-105">
        Search
      </button>
    </div>
  );
};

export default SearchForm;
