import { Address } from "../../../../../../DataModel/Objects/Address";
import { AddressCard } from "./AddressCard/AddressCard";

type CheckoutProps = {
  addresses: Address[];
  isLoadingAddresses: boolean;
  selectedAddress: Address | undefined;
  setSelectedAddress: (address: Address) => void;
};

export const Checkout: React.FC<CheckoutProps> = ({
  addresses,
  isLoadingAddresses,
  selectedAddress,
  setSelectedAddress,
}) => {
  if (isLoadingAddresses) {
    return (
      <div className="flex layout-column row-gap-16">
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <AddressCard
              address={null}
              key={index}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex layout-column row-gap-16">
      {addresses.map((address, index) => {
        return (
          <AddressCard
            address={address}
            key={index}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        );
      })}
    </div>
  );
};
