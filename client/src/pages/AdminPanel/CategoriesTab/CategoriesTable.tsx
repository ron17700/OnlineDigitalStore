import React, { useState } from "react";
import GenericTable from "../../../components/GenericTable/GenericTable";
import { Category } from "../../../DataModel/Objects/Category";
import { RawText } from "../../../components/RawText/RawText";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { colors } from "../../../styles/colors";
import { CategoryFormModal } from "../../../components/CategoryFormModal/CategoryFormModal";
import { useOceanRequest } from "../../../Hooks/UseOceanRequest";
import { deleteCategory } from "../../../Requests/Category/DeleteCategory";

interface CategoriesTableProps {
  data: Category[];
  onRefresh: () => void;
}

const CategoriesTable: React.FC<CategoriesTableProps> = ({ data, onRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const deleteCategoryRequest = useOceanRequest({ request: deleteCategory });

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedCategoryId(null);
  }

  function handleEditClick(categoryId: string) {
    setSelectedCategoryId(categoryId);
    setIsModalOpen(true);
  }

  function handleAddCategoryClick() {
    setSelectedCategoryId(null);
    setIsModalOpen(true);
  }

  function handleDeleteClick(categoryId: string) {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategoryRequest({ categoryId })
        .then(() => {
          onRefresh();
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete category.");
        });
    }
  }

  const columns = [
    { field: "name" as keyof Category, label: "Name" },
    {
      field: "_id" as keyof Category,
      label: "",
      render: (_: any, item: Category) => (
        <div
        className="action-buttons"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "8px",
            }}
            onClick={() => handleEditClick(item._id)}
          >
            <PencilSquareIcon
              height="32px"
              width="32px"
              color={colors.blue02}
            />
          </button>
          <button
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "8px",
            }}
            onClick={() => handleDeleteClick(item._id)}
          >
            <TrashIcon
              height="32px"
              width="32px"
              color={colors.red02}
            />
          </button>
        </div>
      ),
      className: "action-column",
    },
  ];

  return (
    <div style={{ paddingBlock: "16px", paddingInline: "32px" }}>
      <CategoryFormModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        categoryId={selectedCategoryId}
        onRefresh={onRefresh}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <RawText text={"Categories Table"} fontSize={28} fontWeight={700} />
        <button
          style={{
            backgroundColor: colors.blue02,
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = colors.blue01)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = colors.blue02)
          }
          onClick={handleAddCategoryClick}
        >
          <RawText
            text={"Add Category"}
            color={colors.white}
            fontSize={16}
            fontWeight={700}
          />
        </button>
      </div>
      <GenericTable columns={columns} data={data} />
    </div>
  );
};

export default CategoriesTable;
