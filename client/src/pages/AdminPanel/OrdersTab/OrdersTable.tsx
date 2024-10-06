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
    { field: "_id"  as keyof Order, label: "Order Number" },
    {
      field: "address" as keyof Order,
      label: "Address",
      render: (_: any, item: Order) => (
      <div>
        {`${item.address?.country ?? ""}, ${item.address?.state ?? ""}, ${item.address?.city ?? ""}, ${item.address?.street ?? ""}, ${item.address?.postalCode ?? ""}`}
        </div>
      ),
    },
    { field: "price" as keyof Order, label: "Price",
      render: (_: any, item: Order) => (
        <div>
         {item.price + '$'}
          </div>
        ),
     },
    { field: "createdAt" as keyof Order , label: "Creation Date", 
      render: (_: any, item: Order) => (
        <div>
          {new Date(item.createdAt).toLocaleDateString()}{" "}
          {new Date(item.createdAt).toLocaleTimeString()}
        </div>
      ),
    },
    { field: "updatedAt" as keyof Order , label: "Last Updated Date",
      render: (_: any, item: Order) => (
        <div>
          {new Date(item.updatedAt).toLocaleDateString()}{" "}
          {new Date(item.updatedAt).toLocaleTimeString()}
        </div>
      ),
     },
     { field: "status"  as keyof Order, label: "Status" },
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
      </div>
      <GenericTable columns={columns} data={data} />
    </div>
  );
};

export default OrdersTable;
