import React from "react";
import GenericTable from "../../../components/GenericTable/GenericTable";
import { Order } from "../../../DataModel/Objects/Order";
import { RawText } from "../../../components/RawText/RawText";

const OrdersTable = (props: { data: Order[] }) => {
  const columns = [
    {
      field: "images" as keyof Order,
      label: "",
      render: (images: string[]) => (
        <img src={images[0]} alt="product" className="product-image" />
      ),
    },
    { field: "name" as keyof Order, label: "Name" },
    { field: "description" as keyof Order, label: "Description" },
    { field: "price" as keyof Order, label: "Price" },
    { field: "quantity" as keyof Order, label: "Quantity" },
    {
      field: "_id" as keyof Order,
      label: "",
      render: (_: any, item: Order) => 
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <button onClick={()=>{console.log(item._id)}}>
            edit
        </button>
      </div>,
    },
  ];

  return (
    <div style={{ paddingBlock: "16px", paddingInline: "32px" }}>
      <RawText text={"Products Table"} fontSize={28} fontWeight={700} />
      <GenericTable columns={columns} data={props.data} />
    </div>
  );
};

export default OrdersTable;
