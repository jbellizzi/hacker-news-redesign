import { useState } from "react";

export type Filter = "latest" | "starred";

export const useFilterController = () => {
  const [filter, setFilter] = useState<Filter>("latest");

  const handleFilterChange = (filter: Filter) => {
    setFilter(filter);
  };

  return { filter, handleFilterChange };
};

export type FilterController = ReturnType<typeof useFilterController>;
