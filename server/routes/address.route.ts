import { Router } from 'express';
import AddressController from "../controllers/address.controller";

const router: Router = Router();

router.get('/', AddressController.getAddress);
router.get('/:addressId', AddressController.getAddressById);
router.post('/', AddressController.createAddress);
router.put('/:addressId', AddressController.updateAddress);
router.delete('/:addressId', AddressController.deleteAddress);


export default router;