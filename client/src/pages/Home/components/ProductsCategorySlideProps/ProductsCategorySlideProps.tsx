import { Categories } from "../../../../types/categories";
import { ProductCard } from "../../../../components/ProductCard/ProductCard";
import { RawText } from "../../../../components/RawText/RawText";
import { getCategoryTranslation } from "../../../../translations/categories";
import "./products-category-slide.scss";

interface ProductsCategorySlideProps {
  category: Categories;
}

// MOCKED DATA
export const ProductsCategorySlide: React.FC<ProductsCategorySlideProps> = ({
  category,
}) => {
  const translatedCategory = getCategoryTranslation(category);

  return (
    <div className="products-category-slide-container">
      <div className="category-title-container">
        <RawText text={translatedCategory} fontWeight={700} fontSize={28} />
      </div>
      <div className="products-container flex-100 overflow-x-scroll flex column-gap-16">
        <ProductCard
          name="Strauss Ice Cream | Rishon Lezion"
          description="Moments of Happiness | Ice Cream"
          price={30}
          quantity={25}
          img="https://imageproxy.wolt.com/mes-image/a66c95ce-4278-4752-909a-caa58d878943/bb2747b7-d308-4377-9328-efd6f4e06321?w=600"
        />
        <ProductCard
          name="Strauss Ice Cream | Rishon Lezion"
          description="Moments of Happiness | Ice Cream"
          price={30}
          quantity={25}
          img="https://imageproxy.wolt.com/venue/5ea7f6d68ddc4f12e478e97e/73e053d8-8932-11ea-9ae7-0a58646a502d_dsc00162.jpg?w=600"
        />
        <ProductCard
          name="Strauss Ice Cream | Rishon Lezion"
          description="Moments of Happiness | Ice Cream"
          price={30}
          quantity={25}
          img="https://imageproxy.wolt.com/venue/65afa3e1b126cf3653b81422/b12c8e4a-c421-11ee-ac7f-361e2e781cec_4191d0da_ee30_11ed_87f3_325817b03db2_yaelitz_1.jpg?w=600"
        />
        <ProductCard
          name="Strauss Ice Cream | Rishon Lezion"
          description="Moments of Happiness | Ice Cream"
          price={30}
          quantity={25}
          img="https://imageproxy.wolt.com/venue/6660467da2968e48c156b822/4d4bc738-3c35-11ef-bae4-7ec023e32bb2_4840abe6_305b_11ee_9bc4_9e756357fb32___________1.jpg?w=600"
        />
        <ProductCard
          name="Strauss Ice Cream | Rishon Lezion"
          description="Moments of Happiness | Ice Cream"
          price={30}
          quantity={25}
          img="https://imageproxy.wolt.com/venue/64e1df2e98b192b7a28777ea/8d3fd64a-3f3d-11ee-96b7-66a7eabb11f1_0c3db3c2_18ba_11ee_8c88_1efe3bb62008_571aff2c_08fc_11ed_9249_ca55dec03278_______.jpg?w=600"
        />
        <ProductCard
          name="Strauss Ice Cream | Rishon Lezion"
          description="Moments of Happiness | Ice Cream"
          price={30}
          quantity={25}
          img="https://imageproxy.wolt.com/venue/609152756761adfda3a5130b/6c246c7c-73d8-11ed-8d33-a2ffe09823d4_sahbak___holon.jpeg?w=600"
        />
        <ProductCard
          name="Strauss Ice Cream | Rishon Lezion"
          description="Moments of Happiness | Ice Cream"
          price={30}
          quantity={25}
          img="https://imageproxy.wolt.com/venue/667a7f7180020e4d77d52584/08ab49b6-3d32-11ef-87a3-da7ab757b1f9_b5560d24_65af_11ed_bb9c_8eea278761a8_shutterstock_1369162349.jpg?w=600"
        />
        <ProductCard
          name="Strauss Ice Cream | Rishon Lezion"
          description="Moments of Happiness | Ice Cream"
          price={30}
          quantity={25}
          img="https://imageproxy.wolt.com/venue/66585866962c6961112724ef/137ff100-36cc-11ef-80f1-9251b4b71aa6_2.png?w=600"
        />
      </div>
    </div>
  );
};
