import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./OrderFormModal.module.scss";
import { getOrder } from "../../Requests/Order/GetOrder";
import { updateOrder } from "../../Requests/Order/UpdateOrder";
import { Order, ORDER_STATUSES, OrderStatus } from "../../DataModel/Objects/Order"; // Importing ORDER_STATUSES
import { toast } from "react-toastify";
import { useOceanRequest } from "../../Hooks/UseOceanRequest";
import { RawText } from "../RawText/RawText";
import { colors } from "../../styles/colors";

interface OrderFormModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  orderId: string | null;
  onRefresh: () => void;
}

export const OrderFormModal: React.FC<OrderFormModalProps> = ({
  isModalOpen,
  handleCloseModal,
  orderId,
  onRefresh,
}) => {
  const [data, setData] = useState<Order>({
    _id: "",
    user: "",
    address: null,
    products: [],
    price: 0,
    status: ORDER_STATUSES.Created, // Default status
    isActive: true,
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const getOrderRequest = useOceanRequest({ request: getOrder });
  const updateOrderRequest = useOceanRequest({ request: updateOrder });

  useEffect(() => {
    if (orderId) {
      setIsLoading(true);
      getOrderRequest({ orderId })
        .then((response) => {
          setData(response as Order);
        })
        .catch((err) => {
          console.error(err);
          setData({
            _id: "",
            user: "",
            address: null,
            products: [],
            price: 0,
            status: ORDER_STATUSES.Created,
            isActive: true,
            createdAt: "",
            updatedAt: "",
            __v: 0,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [getOrderRequest, orderId]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setData((prevData) => ({
      ...prevData,
      status: value as OrderStatus,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (orderId) {
        // Update order logic
        const requestData = {
          orderId: data._id,
          order: { ...data,status: data.status },
        };

        updateOrderRequest(requestData)
          .then(() => {
            toast.success("Order status updated successfully!");
            onRefresh();
            handleCloseModal();
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to update order status.");
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
          <RawText text={"Edit Order"} fontSize={24} fontWeight={800} style={{ paddingBlock: "10px" }} />

          {isLoading ? (
            <div className={styles.loadingText}>Loading order data...</div>
          ) : (
            <>
              <div className={styles.formGroup}>
                <RawText text={"Order Number"} />
                <input
                  type="text"
                  name="orderNumber"
                  value={data._id}
                  disabled
                  className={styles.disabledInput}
                />
              </div>

              <div className={styles.formGroup}>
                <RawText text={"Address"} />
                <input
                  type="text"
                  name="Address"
                  value={`${data.address?.country ?? ""}, ${data.address?.state ?? ""}, ${data.address?.city ?? ""}, ${data.address?.street ?? ""}, ${data.address?.postalCode ?? ""}`}
                  disabled
                  className={styles.disabledInput}
                />
              </div>

              <div className={styles.formGroup}>
                <RawText text={"Price"} />
                <input
                  type="number"
                  name="price"
                  value={data.price}
                  disabled
                  className={styles.disabledInput}
                />
              </div>

              <div className={styles.formGroup}>
                <RawText text={"Status"} />
                <select
                  name="status"
                  value={data.status}
                  onChange={handleStatusChange}
                  className={errors.status ? styles.errorInput : ""}
                >
                  {Object.values(ORDER_STATUSES).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <span className={styles.errorText}>{errors.status}</span>
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
