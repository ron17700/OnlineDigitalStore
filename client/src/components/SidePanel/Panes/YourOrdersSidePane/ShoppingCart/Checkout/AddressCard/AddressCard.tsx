import { Address } from "../../../../../../../DataModel/Objects/Address";
import { colors } from "../../../../../../../styles/colors";
import { getClassName } from "../../../../../../../Utils/getClassName";
import { RawText } from "../../../../../../RawText/RawText";
import { Shimmer } from "../../../../../../Shimmer/Shimmer";
import {
  BuildingOffice2Icon,
  FlagIcon,
  GlobeAmericasIcon,
  EnvelopeIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/16/solid";
import "./address-card.scss";

type AddressCardProps = {
  address: Address | null;
  selectedAddress: Address | undefined;
  setSelectedAddress: (address: Address) => void;
  clickable?: boolean;
  removeAddress?: (address: Address) => void;
};

export const AddressCard: React.FC<AddressCardProps> = ({
  address,
  selectedAddress,
  setSelectedAddress,
  clickable = true,
  removeAddress,
}) => {
  const isLoading = !address;

  return (
    <div
      className={getClassName("address-card-container", {
        selected: address === selectedAddress,
        loading: isLoading,
        clickable,
      })}
      onClick={() => {
        if (address && clickable) {
          setSelectedAddress(address);
        }
      }}
    >
      <div className="flex row-gap-16 layout-column">
        <div className="flex align-center column-gap-8">
          <GlobeAmericasIcon height="16px" width="16px" color={colors.gray02} />
          <RawText
            text="Country"
            fontWeight={500}
            style={{ width: 120 }}
            color={colors.gray02}
          />
          {isLoading ? (
            <Shimmer width="200px" />
          ) : (
            <RawText text={address.country} />
          )}
        </div>
        <div className="flex align-center column-gap-8">
          <FlagIcon height="16px" width="16px" color={colors.gray02} />
          <RawText
            text="State"
            fontWeight={500}
            style={{ width: 120 }}
            color={colors.gray02}
          />
          {isLoading ? (
            <Shimmer width="200px" />
          ) : (
            <RawText text={address.state} />
          )}
        </div>
        <div className="flex align-center column-gap-8">
          <BuildingOffice2Icon
            height="16px"
            width="16px"
            color={colors.gray02}
          />
          <RawText
            text="City"
            fontWeight={500}
            style={{ width: 120 }}
            color={colors.gray02}
          />
          {isLoading ? (
            <Shimmer width="200px" />
          ) : (
            <RawText text={address.city} />
          )}
        </div>
        <div className="flex align-center column-gap-8">
          <HomeIcon height="16px" width="16px" color={colors.gray02} />
          <RawText
            text="Street"
            fontWeight={500}
            style={{ width: 120 }}
            color={colors.gray02}
          />
          {isLoading ? (
            <Shimmer width="200px" />
          ) : (
            <RawText text={address.street} />
          )}
        </div>
        <div className="flex align-center column-gap-8">
          <EnvelopeIcon height="16px" width="16px" color={colors.gray02} />
          <RawText
            text="Postal code"
            fontWeight={500}
            style={{ width: 120 }}
            color={colors.gray02}
          />
          {isLoading ? (
            <Shimmer width="200px" />
          ) : (
            <RawText text={address.postalCode} />
          )}
        </div>
      </div>
      {removeAddress && address && (
        <div
          className="remove-button-container"
          onClick={() => removeAddress(address)}
        >
          <TrashIcon height={16} width={16} color={colors.gray02} />
        </div>
      )}
    </div>
  );
};
