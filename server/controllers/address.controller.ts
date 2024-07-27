import {Response, NextFunction} from 'express';
import AddressService from "../services/address.service";

interface AddressController {
    getAddress(req: any, res: Response, next: NextFunction): Promise<Response | void>;
    getAddressById(req: any, res: Response, next: NextFunction): Promise<Response | void>;
    createAddress(req: any, res: Response, next: NextFunction): Promise<Response | void>;
    updateAddress(req: any, res: Response, next: NextFunction): Promise<Response | void>;
    deleteAddress(req: any, res: Response, next: NextFunction): Promise<Response | void>;
}

const AddressController: AddressController = {
    async getAddressById(req, res, next) {
        try {
            const {addressId} = req.params;
            const address = await AddressService.getAddressById(addressId, req.userId, req.isAdmin);
            res.status(200).json(address);
        } catch (error) {
            next(error)
        }
    },
    async getAddress(req, res, next) {
        try {
            const addresses = await AddressService.getAddress(req.userId, req.isAdmin);
            res.status(200).json(addresses);
        } catch (error) {
            next(error)
        }
    },

    async createAddress(req, res, next) {
        try {
            const address = await AddressService.createAddress(req.userId, req.body);
            res.status(201).json(address);
        } catch (error) {
            next(error)
        }
    },

    async updateAddress(req, res, next) {
        try {
            const {addressId} = req.params;
            const address = await AddressService.updateAddress(addressId, req.userId, req.isAdmin, req.body);
            res.status(200).json(address);
        } catch (error) {
            next(error);
        }
    },

    async deleteAddress(req, res, next) {
        try {
            const {addressId} = req.params;
            await AddressService.deleteAddress(addressId, req.userId, req.isAdmin);
            res.status(200).json({message: 'Address deleted successfully!'});
        } catch (error) {
            next(error);
        }
    }
};

export default AddressController;