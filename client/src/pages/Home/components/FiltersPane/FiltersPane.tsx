import { useEffect, useState } from "react";
import { Category } from "../../../../DataModel/Objects/Category";
import { OceanInput } from "../../../../components/OceanInput/OceanInput";
import {
  AdjustmentsHorizontalIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { colors } from "../../../../styles/colors";
import { getClassName } from "../../../../Utils/getClassName";
import { RawText } from "../../../../components/RawText/RawText";
import "./filters-pane.scss";
import { Separator } from "../../../../components/Separator/Separator";
import { SecondaryButton } from "../../../../components/SecondaryButton/SecondaryButton";
import { PrimaryButton } from "../../../../components/PrimaryButton/PrimaryButton";
import { GetProductsRequestParams } from "../../../../Requests/Product/GetProducts";
import { NAVBAR_HEIGHT } from "../../../../components/Navbar/constants";
import { NavbarButton } from "../../../../components/Navbar/NavbarButton/NavbarButton";

type FiltersPaneProps = {
  categories: Category[] | undefined;

  minPrice: number | undefined;
  maxPrice: number | undefined;
  selectedCategories: Category[];
  inStock: boolean;
  currentFilters?: Omit<GetProductsRequestParams, "token">;

  setMinPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
  setMaxPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
  setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setInStock: React.Dispatch<React.SetStateAction<boolean>>;

  fetchProducts: (clearFilters?: boolean) => Promise<void>;
};

const paneWidth = 300;

export const FiltersPane: React.FC<FiltersPaneProps> = ({
  fetchProducts,
  categories,
  inStock,
  maxPrice,
  minPrice,
  selectedCategories,
  currentFilters,
  setMaxPrice,
  setMinPrice,
  setSelectedCategories,
  setInStock,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const checkIfFilterRangesValid = () => {
    if (minPrice && maxPrice) {
      return minPrice <= maxPrice;
    }

    return true;
  };
  const checkIfFiltersChanged = () => {
    const hasFilters =
      minPrice ||
      maxPrice ||
      inStock ||
      selectedCategories.length !== categories?.length;

    if (!hasFilters) {
      return currentFilters !== undefined;
    }

    const _currentFilters: Omit<GetProductsRequestParams, "token"> = {
      filters: {
        minPrice,
        maxPrice,
        inStock: inStock || undefined,
        categories: selectedCategories[0]?._id,
      },
    };

    return JSON.stringify(_currentFilters) !== JSON.stringify(currentFilters);
  };

  const sharedStyles: React.CSSProperties = {
    height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
    width: isVisible ? `${paneWidth}px` : "0",
    transition: "all 0.3s ease",
  };

  const onSelectAllCategoriesClick = () => {
    if (selectedCategories.length === categories?.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categories || []);
    }
  };

  const getPaneFiltersContent = () => {
    if (!isVisible) {
      return null;
    }

    return (
      <div className={"flex layout-column row-gap-16 flex-1"}>
        <div className="flex layout-column row-gap-8">
          <RawText
            text="Pricing range"
            fontWeight={700}
            fontSize={22}
            style={{
              marginBottom: `8px`,
            }}
          />
          <div className="flex align-center space-between">
            <RawText text="From" className="flex-shrink-0" />
            <OceanInput
              containerStyle={{ maxWidth: "150px" }}
              type="number"
              placeholder="Min price"
              value={minPrice?.toString() || ""}
              rightIcon={
                <CurrencyDollarIcon
                  height="16px"
                  width="16px"
                  color={colors.gray02}
                />
              }
              onChange={(value) => {
                if (value) {
                  const parsedValue = parseInt(value);
                  if (parsedValue >= 0) {
                    setMinPrice(parsedValue);
                  }
                } else {
                  setMinPrice(undefined);
                }
              }}
            />
          </div>
          <div className="flex align-center space-between">
            <RawText text="To" className="flex-shrink-0" />
            <OceanInput
              containerStyle={{ maxWidth: "150px" }}
              rightIcon={
                <CurrencyDollarIcon
                  height="16px"
                  width="16px"
                  color={colors.gray02}
                />
              }
              type="number"
              placeholder="Max price"
              value={maxPrice?.toString() || ""}
              onChange={(value) => {
                if (value) {
                  const parsedValue = parseInt(value);
                  setMaxPrice(parsedValue);
                } else {
                  setMaxPrice(undefined);
                }
              }}
            />
          </div>
        </div>
        <Separator />
        <div className="flex layout-column row-gap-8">
          <RawText text="Categories" fontWeight={700} fontSize={22} />
          <div
            className="flex align-center column-gap-8 cursor-pointer"
            onClick={onSelectAllCategoriesClick}
          >
            <OceanInput
              type="checkbox"
              checked={selectedCategories.length === categories?.length}
              value={"all"}
              onChange={onSelectAllCategoriesClick}
            />
            <RawText text={"Select all"} />
          </div>
          <div
            className="flex layout-column row-gap-8 column-gap-8 flex-wrap"
            style={{ maxHeight: "350px" }}
          >
            {categories?.map((category) => {
              const isSelected = selectedCategories.includes(category);

              const onCategoryClick = () => {
                if (isSelected) {
                  setSelectedCategories(
                    selectedCategories.filter((c) => c !== category)
                  );
                } else {
                  setSelectedCategories([...selectedCategories, category]);
                }
              };

              return (
                <div
                  className="flex align-center column-gap-8 cursor-pointer"
                  key={category._id}
                  onClick={onCategoryClick}
                >
                  <OceanInput
                    type="checkbox"
                    checked={isSelected}
                    value={category._id}
                    onChange={onCategoryClick}
                  />
                  <RawText text={category.name} />
                </div>
              );
            })}
          </div>
        </div>
        <Separator />
        <div className="flex layout-column row-gap-8">
          <RawText text="In stock" fontWeight={700} fontSize={22} />
          <div
            className="flex align-center column-gap-8 cursor-pointer"
            onClick={(value) => {
              if (inStock) {
                setInStock(false);
              } else {
                setInStock(true);
              }
            }}
          >
            <OceanInput
              type="checkbox"
              checked={inStock}
              value={"inStock"}
              onChange={(value) => {
                if (inStock) {
                  setInStock(false);
                } else {
                  setInStock(true);
                }
              }}
            />
            <RawText text={"show in stock items only"} />
          </div>
        </div>
        <div
          className="flex align-center column-gap-16"
          style={{
            marginTop: "auto",
            marginBottom: "24px",
            maxWidth: "calc(100% - 32px)",
          }}
        >
          <SecondaryButton
            label="Reset"
            onClick={() => fetchProducts(true)}
            disabled={!currentFilters}
          />
          <PrimaryButton
            label="Apply"
            onClick={() => fetchProducts()}
            disabled={!checkIfFiltersChanged() || !checkIfFilterRangesValid()}
          />
        </div>
      </div>
    );
  };

  useEffect(() => {
    setSelectedCategories(categories || []);
  }, [categories, setSelectedCategories]);

  return (
    <div
      className="relative filters-pane-container"
      style={{
        ...sharedStyles,
        flexShrink: 0,
      }}
    >
      <div
        className={getClassName(
          "filters-pane-fixed-content box-shadow relative",
          {
            visible: isVisible,
            hidden: !isVisible,
          }
        )}
        style={{
          ...sharedStyles,
          top: NAVBAR_HEIGHT,
        }}
      >
        {getPaneFiltersContent()}
        <NavbarButton
          icon={
            <AdjustmentsHorizontalIcon
              height="20px"
              width="20px"
              color={colors.gray02}
            />
          }
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(!isVisible);
          }}
          style={{
            position: "absolute",
            top: 100,
            left: `calc(100% + 5px)`,
          }}
        />
      </div>
    </div>
  );
};
