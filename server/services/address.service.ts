import AddressModel, {IAddress} from "../models/address.model";

const AddressService = {
    async getAddressById(addressId: string, userId: string, isAdmin: boolean) {
        const existingAddress: IAddress | null = await AddressModel.findById(addressId).exec();
        if (!existingAddress) {
            throw new Error('Address not found!');
        }

        if (existingAddress.user !== userId && !isAdmin) {
            throw new Error('Unauthorized!');
        }
        return existingAddress;

    },
    async getAddress(userId: string, isAdmin: boolean) {
        if (isAdmin) {
            return await AddressModel.find({isActive: true}).exec();
        }
        return await AddressModel.find({ user: userId, isActive: true }).exec();
    },
    async createAddress(userId: string, address: IAddress) {
        address.user = userId;
        return await AddressModel.create(address);
    },
    async updateAddress(addressId: string, userId: string, isAdmin: boolean, address: IAddress) {
        let existingAddress: IAddress | null = await AddressModel.findById(addressId).exec();
        if (!existingAddress) {
            throw new Error('Address not found!');
        }

        if (existingAddress.user !== userId && !isAdmin) {
            throw new Error('Unauthorized!');
        }

        existingAddress.street = address.street;
        existingAddress.city = address.city;
        existingAddress.state = address.state;
        existingAddress.postalCode = address.postalCode;
        existingAddress.country = address.country;
        return await existingAddress.save();
    },
    async deleteAddress(addressId: string, userId: string, isAdmin: boolean) {
        const existingAddress: IAddress | null = await AddressModel.findById(addressId).exec();
        if (!existingAddress) {
            throw new Error('Address not found!');
        }

        if (existingAddress.user !== userId && !isAdmin) {
            throw new Error('Unauthorized!');
        }
        existingAddress.isActive = false;
        return await existingAddress.save();
    }
};

export default AddressService;
