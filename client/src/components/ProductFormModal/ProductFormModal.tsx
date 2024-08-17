import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./ProductFormModal.module.scss";
import { getProduct } from "../../Requests/Product/GetProduct";
import { updateProduct } from "../../Requests/Product/UpdateProduct";
import { createProduct } from "../../Requests/Product/CreateProduct";
import { getCategories } from "../../Requests/Category/GetCategories"; // Assuming you have a getCategories request
import { ProductI } from "../../DataModel/Objects/Product";
import { Category } from "../../DataModel/Objects/Category";
import { toast } from "react-toastify";
import { useOceanRequest } from "../../Hooks/UseOceanRequest";
import { RawText } from "../RawText/RawText";
import { colors } from "../../styles/colors";

interface ProductFormModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  productId: string | null;
  onRefresh: () => void;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isModalOpen,
  handleCloseModal,
  productId,
  onRefresh,
}) => {
  const [data, setData] = useState<ProductI>({
    _id: "",
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    images: [""],
    category: null,
    isActive: false,
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const getProductRequest = useOceanRequest({ request: getProduct });
  const updateProductRequest = useOceanRequest({ request: updateProduct });
  const createProductRequest = useOceanRequest({ request: createProduct });
  const getCategoriesRequest = useOceanRequest({ request: getCategories });

  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      getProductRequest({ productId: productId })
        .then((response) => {
          setData(response as ProductI);
        })
        .catch((err) => {
          console.error(err);
          setData({
            _id: "",
            name: "",
            description: "",
            price: 0,
            quantity: 0,
            images: [""],
            category: null,
            isActive: false,
            createdAt: "",
            updatedAt: "",
            __v: 0,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setData({
        _id: "",
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        images: [""],
        category: null,
        isActive: false,
        createdAt: "",
        updatedAt: "",
        __v: 0,
      });
    }

    // Fetch categories when the component mounts
    getCategoriesRequest(null)
      .then((response) => {
        setCategories(response);
      })
      .catch((err) => {
        console.error(err);
        setCategories([]);
      });
  }, [getProductRequest, getCategoriesRequest, productId]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!data.name) newErrors.name = "Name is required";
    if (!data.description) newErrors.description = "Description is required";
    if (data.price <= 0) newErrors.price = "Price must be greater than 0";
    if (data.quantity <= 0) newErrors.quantity = "Quantity cannot be negative";
    if (!data.images[0]) newErrors.images = "At least one image URL is required";
    if (!data.category) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = categories.find(category => category._id === e.target.value);
    setData({ ...data, category: selectedCategory?._id || null });

    if (errors.category) {
      setErrors({ ...errors, category: "" });
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;
  
    try {
      const categoryId = data.category; // Extract the category ID
  
      const productPayload = {
        ...data,
        category: categoryId, // Send only the category ID
      };
  
      if (productId) {
        // Update product logic
        const requestData = {
          productId: data._id,
          product: productPayload,
        };
  
        updateProductRequest(requestData)
          .then(() => {
            toast.success("Product updated successfully!");
            onRefresh();
            handleCloseModal();
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to update product.");
          });
      } else {
        // Create product logic
        const { _id, ...productWithoutId } = productPayload;
  
        const requestData = {
          product: {
            ...productWithoutId,
            isActive: true,
          },
        };
  
        createProductRequest(requestData)
          .then(() => {
            toast.success("Product created successfully!");
            onRefresh();
            handleCloseModal();
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to create product.");
          });
      }
    } catch (error) {
      console.error("Failed to get access token", error);
      toast.error("Failed to authenticate.");
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      setErrors({});
    }
  }, [isModalOpen]);

  return (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <RawText text={productId ? "Edit Product" : "Add Product"} fontSize={24} fontWeight={800} style={{paddingBlock:'10px'}}/>

          {isLoading ? (
            <div className={styles.loadingText}>Loading product data...</div>
          ) : (
            <>
              <div className={styles.formGroup}>
                <RawText text={'Name'}/>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  className={errors.name ? styles.errorInput : ""}
                />
                {errors.name && (
                  <span className={styles.errorText}>{errors.name}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <RawText text={'Description'}/>
                <textarea
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  className={errors.description ? styles.errorInput : ""}
                />
                {errors.description && (
                  <span className={styles.errorText}>{errors.description}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <RawText text={'Price'}/>
                <input
                  type="number"
                  name="price"
                  value={data.price}
                  onChange={handleChange}
                  className={errors.price ? styles.errorInput : ""}
                />
                {errors.price && (
                  <span className={styles.errorText}>{errors.price}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <RawText text={'Quantity'}/>
                <input
                  type="number"
                  name="quantity"
                  value={data.quantity}
                  onChange={handleChange}
                  className={errors.quantity ? styles.errorInput : ""}
                />
                {errors.quantity && (
                  <span className={styles.errorText}>{errors.quantity}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <RawText text={'Image URL'}/> 
                <input
                  type="text"
                  name="images"
                  value={data.images[0]}
                  onChange={(e) => {
                    setData({ ...data, images: [e.target.value] });
                    if (errors.images) {
                      setErrors({ ...errors, images: "" });
                    }
                  }}
                  className={errors.images ? styles.errorInput : ""}
                />
                {errors.images && (
                  <span className={styles.errorText}>{errors.images}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <RawText text={'Category'}/>
                <select
                  name="category"
                  value={data.category || ""}
                  onChange={handleCategoryChange}
                  className={errors.category ? styles.errorInput : ""}
                >
                  <option value="" disabled>
                    <RawText text={'Select a category'}/> 
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span className={styles.errorText}>{errors.category}</span>
                )}
              </div>

              <button onClick={handleSubmit} className={styles.submitButton}>
                <RawText text={'Submit'} fontSize={16} fontWeight={700} color={colors.white}/> 
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
