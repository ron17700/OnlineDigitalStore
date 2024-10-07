import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { Address } from "../../../../DataModel/Objects/Address";
import { useOceanRequest } from "../../../../Hooks/UseOceanRequest";
import { getAddresses } from "../../../../Requests/Address/GetAddresses";
import { PrimaryButton } from "../../../PrimaryButton/PrimaryButton";
import { RawText } from "../../../RawText/RawText";
import { AddressCard } from "../YourOrdersSidePane/ShoppingCart/Checkout/AddressCard/AddressCard";
import { deleteAddress } from "../../../../Requests/Address/DeleteAddress";
import {useAuth0} from "@auth0/auth0-react";

type AddressesProps = {
  moveToCreateAddress: () => void;
};

export const Addresses: React.FC<AddressesProps> = ({
  moveToCreateAddress,
}) => {
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const addressesRef = useRef(addresses);
  const { user} = useAuth0();

  const getAddressesRequest = useOceanRequest({
    request: getAddresses,
  });

  const removeAddressRequest = useOceanRequest({
    request: deleteAddress,
  });

  const removeAddressHandler = useCallback((address: Address) => {
    const fullAddresses = [...addressesRef.current];
    setAddresses(fullAddresses.filter((a) => a._id !== address._id));

    removeAddressRequest({
      addressId: address._id,
    })
      .then(() => {
        toast.success("Address removed successfully");
      })
      .catch(() => {
        toast.error("Failed to remove address");
        setAddresses(fullAddresses);
      });
  }, []);

  useEffect(() => {
    setIsLoadingAddresses(true);

    getAddressesRequest(null)
      .then((res) => {
        const myAddresses = res.filter(address => address.user === user?.sub);
        setAddresses(myAddresses);
      })
      .catch((err) => {
        setAddresses([]);
        toast.error("Failed to get addresses");
      })
      .finally(() => {
        setIsLoadingAddresses(false);
      });
  }, []);

  useEffect(() => {
    addressesRef.current = addresses;
  }, [addresses]);

  const getContent = () => {
    if (isLoadingAddresses) {
      return Array.from({ length: 5 }).map((_, index) => {
        return (
          <AddressCard
            selectedAddress={undefined}
            setSelectedAddress={() => {}}
            clickable={false}
            address={null}
            key={index}
          />
        );
      });
    }

    if (!addresses.length) {
      return (
        <>
          <RawText text="Its look like you don't have any address" />
          <PrimaryButton
            label="Create a new one"
            onClick={moveToCreateAddress}
          />
        </>
      );
    }

    return (
      <>
        <PrimaryButton label="Create a new one" onClick={moveToCreateAddress} />
        {addresses.map((address, index) => {
          return (
            <AddressCard
              selectedAddress={undefined}
              setSelectedAddress={() => {}}
              clickable={false}
              address={address}
              key={index}
              removeAddress={removeAddressHandler}
            />
          );
        })}
      </>
    );
  };

  return (
    <div className="flex layout-column row-gap-16 align-center">
      {getContent()}
    </div>
  );
};
