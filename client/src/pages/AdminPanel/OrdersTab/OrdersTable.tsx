import React, { useState } from "react";
import GenericTable from "../../../components/GenericTable/GenericTable";
import { Order } from "../../../DataModel/Objects/Order"; // You will need to define this type
import { RawText } from "../../../components/RawText/RawText";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { colors } from "../../../styles/colors";
import { OrderFormModal } from "../../../components/OrderFormModal/OrderFormModal"; // You will need to create this component
import { useOceanRequest } from "../../../Hooks/UseOceanRequest";
import { deleteOrder } from "../../../Requests/Order/DeleteOrder"; // You will need to create this request

interface OrdersTableProps {
  data: Order[];
  onRefresh: () => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ data, onRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const deleteOrderRequest = useOceanRequest({ request: deleteOrder });

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  }

  function handleEditClick(orderId: string) {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  }

  function handleAddOrderClick() {
    setSelectedOrderId(null);
    setIsModalOpen(true);
  }

  function handleDeleteClick(orderId: string) {
    if (window.confirm("Are you sure you want to delete this order?")) {
      deleteOrderRequest({ orderId })
        .then(() => {
          onRefresh();
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete order.");
        });
    }
  }

  const columns = [
    { field: "orderNumber" as keyof Order, label: "Order Number" },
    { field: "customerName" as keyof Order, label: "Customer Name" },
    { field: "totalAmount" as keyof Order, label: "Total Amount" },
    { field: "status" as keyof Order, label: "Status" },
    {
      field: "_id" as keyof Order,
      label: "",
      render: (_: any, item: Order) => (
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
      <OrderFormModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        orderId={selectedOrderId}
        onRefresh={onRefresh}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <RawText text={"Orders Table"} fontSize={28} fontWeight={700} />
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
          onClick={handleAddOrderClick}
        >
          <RawText
            text={"Add Order"}
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

export default OrdersTable;
