import React, { useState } from "react";
import GenericTable from "../../../components/GenericTable/GenericTable";
import { Product } from "../../../DataModel/Objects/Product";
import { RawText } from "../../../components/RawText/RawText";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { colors } from "../../../styles/colors";
import { ProductFormModal } from "../../../components/ProductFormModal/ProductFormModal";
import { useOceanRequest } from "../../../Hooks/UseOceanRequest";
import { deleteProduct } from "../../../Requests/Product/DeleteProduct"; // Assume you have a delete request

interface ProductsTableProps {
  data: Product[];
  onRefresh: () => void; // Add this prop to handle refreshing the data
}

const ProductsTable: React.FC<ProductsTableProps> = ({ data, onRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const deleteProductRequest = useOceanRequest({ request: deleteProduct });

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedProductId(null); // Reset the selected product ID when closing the modal
  }

  function handleEditClick(productId: string) {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  }

  function handleAddProductClick() {
    setSelectedProductId(null); // Set product ID to null for adding a new product
    setIsModalOpen(true);
  }

  function handleDeleteClick(productId: string) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProductRequest({ productId })
        .then(() => {
          onRefresh(); // Refresh the product list after deletion
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete product.");
        });
    }
  }

  const columns = [
    {
      field: "images" as keyof Product,
      label: "",
      render: (images: string[]) => (
        <img src={images[0]} alt="product" className="product-image" />
      ),
      className: "image-column", // Assign a class to this column
    },
    { field: "name" as keyof Product, label: "Name" },
    { field: "description" as keyof Product, label: "Description" },
    { field: "price" as keyof Product, label: "Price" },
    { field: "quantity" as keyof Product, label: "Quantity" },
    {
      field: "category" as keyof Product,
      label: "Category",
      render: (_: any, item: Product) => item.category?.name ?? "No Category",
    },
    {
      field: "_id" as keyof Product,
      label: "",
      render: (_: any, item: Product) => (
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
      className: "action-column", // Add this line to apply the specific class
    },
  ];

  return (
    <div style={{ paddingBlock: "16px", paddingInline: "32px" }}>
      <ProductFormModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        productId={selectedProductId}
        onRefresh={onRefresh} // Pass the refresh function to the modal
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <RawText text={"Products Table"} fontSize={28} fontWeight={700} />
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
          onClick={handleAddProductClick}
        >
          <RawText
            text={"Add Product"}
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

export default ProductsTable;
