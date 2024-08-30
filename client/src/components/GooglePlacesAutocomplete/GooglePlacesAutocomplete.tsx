import React, { useState, useRef } from "react";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import { OceanInput } from "../OceanInput/OceanInput";
import { useOceanRequest } from "../../Hooks/UseOceanRequest";
import {
  AddressRequestType,
  createAddress,
} from "../../Requests/Address/CreateAddress";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import { Address } from "../../DataModel/Objects/Address";
import { toast } from "react-toastify";

type GooglePlacesAutocompleteWithMapProps = {
  onAddressCreated: (address: Address) => void;
};

const defaultCoordinates = {
  lat: -34.397,
  lng: 150.644,
};

export const GooglePlacesAutocompleteWithMap: React.FC<
  GooglePlacesAutocompleteWithMapProps
> = ({ onAddressCreated }) => {
  const [addressObject, setAddressDetails] = useState<AddressRequestType>();
  const [isCreatingAddress, setIsCreatingAddress] = useState(false);
  const [address, setAddress] = useState<string>("");
  const [location, setLocation] = useState<{ lat: number; lng: number }>(
    defaultCoordinates
  );

  const createAddressRequest = useOceanRequest({
    request: createAddress,
  });

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setLocation({ lat, lng });
        setAddress(place.formatted_address || "");

        const addressComponents = place.address_components || [];
        const details: AddressRequestType = {
          city: "--",
          country: "--",
          isActive: true,
          postalCode: "--",
          state: "--",
          street: "--",
        };

        addressComponents.forEach((component) => {
          const types = component.types;
          if (types.includes("country")) {
            details.country = component.long_name;
          } else if (types.includes("administrative_area_level_1")) {
            details.state = component.long_name;
          } else if (types.includes("locality")) {
            details.city = component.long_name;
          } else if (types.includes("route")) {
            details.street = component.long_name;
          } else if (types.includes("postal_code")) {
            details.postalCode = component.long_name;
          }
        });

        setAddressDetails(details);
      } else {
        console.error("Place has no geometry");
      }
    }
  };

  return (
    <div className="flex layout-column row-gap-16">
      <div style={{ flex: 1 }}>
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceChanged}
        >
          <OceanInput
            onChange={(e) => setAddress(e)}
            value={address}
            placeholder="Enter an address"
          />
        </Autocomplete>
      </div>
      <div style={{ flex: 2 }}>
        <GoogleMap
          center={location}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "400px" }}
          onLoad={(map) => {
            mapRef.current = map;
          }}
        >
          <Marker position={location} />
        </GoogleMap>
      </div>
      <PrimaryButton
        onClick={() => {
          if (addressObject) {
            setIsCreatingAddress(true);
            createAddressRequest({ address: addressObject })
              .then((createdAddress) => {
                toast.success("Address has been created successfully");
                onAddressCreated(createdAddress);
              })
              .catch(() => {
                toast.error("Address creation has been failed");
                setAddressDetails(undefined);
                setAddress("");
                setLocation(defaultCoordinates);
              })
              .finally(() => {
                setIsCreatingAddress(false);
              });
          }
        }}
        label="Create Address"
        disabled={isCreatingAddress || !address}
      />
    </div>
  );
};
