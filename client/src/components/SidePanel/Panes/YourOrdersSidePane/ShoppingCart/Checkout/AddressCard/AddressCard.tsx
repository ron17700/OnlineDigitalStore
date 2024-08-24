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
import "./address-card.scss";

type AddressCardProps = {
  address: Address | null;
  selectedAddress: Address | undefined;
  setSelectedAddress: (address: Address) => void;
};

export const AddressCard: React.FC<AddressCardProps> = ({
  address,
  selectedAddress,
  setSelectedAddress,
}) => {
  const isLoading = !address;

  return (
    <div
      onClick={() => {
        if (address) {
          setSelectedAddress(address);
        }
      }}
      className={getClassName("address-card-container", {
        selected: address === selectedAddress,
        loading: isLoading,
      })}
    >
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
        <BuildingOffice2Icon height="16px" width="16px" color={colors.gray02} />
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
  );
};
