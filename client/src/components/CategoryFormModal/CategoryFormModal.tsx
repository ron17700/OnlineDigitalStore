import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./CategoryFormModal.module.scss";
import { getCategory } from "../../Requests/Category/GetCategory";
import { updateCategory } from "../../Requests/Category/UpdateCategory";
import { createCategory } from "../../Requests/Category/CreateCategory";
import { Category } from "../../DataModel/Objects/Category";
import { toast } from "react-toastify";
import { useOceanRequest } from "../../Hooks/UseOceanRequest";
import { RawText } from "../RawText/RawText";
import { colors } from "../../styles/colors";

interface CategoryFormModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  categoryId: string | null;
  onRefresh: () => void;
}

export const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  isModalOpen,
  handleCloseModal,
  categoryId,
  onRefresh,
}) => {
  const [data, setData] = useState<Category>({
    _id: "",
    name: "",
    icon: "",
    isActive: true,  // Default isActive to true
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const getCategoryRequest = useOceanRequest({ request: getCategory });
  const updateCategoryRequest = useOceanRequest({ request: updateCategory });
  const createCategoryRequest = useOceanRequest({ request: createCategory });

  useEffect(() => {
    if (categoryId) {
      setIsLoading(true);
      getCategoryRequest({ categoryId })
        .then((response) => {
          setData(response as Category);
        })
        .catch((err) => {
          console.error(err);
          setData({
            _id: "",
            name: "",
            icon: "",
            isActive: true,
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
        icon: "",
        isActive: true,
        createdAt: "",
        updatedAt: "",
        __v: 0,
      });
    }
  }, [getCategoryRequest, categoryId]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!data.name) newErrors.name = "Name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      if (categoryId) {
        // Update category logic
        const requestData = {
          categoryId: data._id,
          category: data,
        };

        updateCategoryRequest(requestData)
          .then(() => {
            toast.success("Category updated successfully!");
            onRefresh();
            handleCloseModal();
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to update category.");
          });
      } else {
        // Create category logic
        const { _id, ...categoryWithoutId } = data;

        const requestData = {
          category: categoryWithoutId,
        };

        createCategoryRequest(requestData)
          .then(() => {
            toast.success("Category created successfully!");
            onRefresh();
            handleCloseModal();
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to create category.");
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
          <RawText text={categoryId ? "Edit Category" : "Add Category"} fontSize={24} fontWeight={800} style={{ paddingBlock: "10px" }} />

          {isLoading ? (
            <div className={styles.loadingText}>Loading category data...</div>
          ) : (
            <>
              <div className={styles.formGroup}>
                <RawText text={"Name"} />
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

              <div className={styles.submitButtonContainer}>
                <button onClick={handleSubmit} className={styles.submitButton}>
                  <RawText text={"Submit"} fontSize={16} fontWeight={700} color={colors.white} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
