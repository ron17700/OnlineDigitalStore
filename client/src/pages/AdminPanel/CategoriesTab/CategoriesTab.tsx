import { useEffect, useState } from "react";
import { Category } from "../../../DataModel/Objects/Category";
import { getCategories } from "../../../Requests/Category/GetCategories";
import { useAuth0 } from "@auth0/auth0-react";
import { useOceanRequest } from "../../../Hooks/UseOceanRequest";
import CategoriesTable from "./CategoriesTable";

export const CategoriesTab: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [categories, setCategories] = useState<Category[]>();
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const getCategoriesRequest = useOceanRequest({
    request: getCategories,
  });

  const fetchCategories = () => {
    setIsLoadingCategories(true);
    getCategoriesRequest(null)
      .then((response) => {
        setCategories(response);
      })
      .catch((err) => {
        console.error(err);
        setCategories([]);
      })
      .finally(() => {
        setIsLoadingCategories(false);
      });
  };

  useEffect(() => {
    if (!isAuthenticated || isLoading) {
      return;
    }

    fetchCategories();
  }, [isLoading, isAuthenticated]);

  if (isLoading || isLoadingCategories) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {categories && <CategoriesTable data={categories} onRefresh={fetchCategories} />}
    </div>
  );
};
