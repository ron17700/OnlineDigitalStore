import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../App";
import { Navbar } from "./components/Navbar/Navbar";
import { ProductsCategorySlide } from "./components/ProductsCategorySlideProps/ProductsCategorySlideProps";
import { CATEGORIES } from "../../types/categories";

export const Home: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  if (!isAuthenticated && !isLoading) {
    navigate(`/${ROUTES.LOGIN}`);
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex layout-column row-gap-24">
        <ProductsCategorySlide category={CATEGORIES.ELECTRONICS} />
        <ProductsCategorySlide category={CATEGORIES.CLOTHING} />
        <ProductsCategorySlide category={CATEGORIES.HOME} />
        <ProductsCategorySlide category={CATEGORIES.SPORTS} />
      </div>
    </div>
  );
};
