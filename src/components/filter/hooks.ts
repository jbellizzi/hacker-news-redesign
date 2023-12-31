import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export type Filter = "latest" | "starred";

export const useFilterController = () => {
  const [filter, setFilter] = useState<Filter>("latest");

  const a = useLocation();

  // set filter based on pathname. using switch case instead of object to avoid passing a non-allowable value to
  // setFilter
  useEffect(() => {
    switch (a.pathname) {
      case "/latest":
        setFilter("latest");
        break;
      case "/starred":
        setFilter("starred");
        break;
    }
  }, [a.pathname]);

  return { filter };
};

export type FilterController = ReturnType<typeof useFilterController>;
