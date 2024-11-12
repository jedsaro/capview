import {Router} from "express";
import devices from "./devices.js";
import accounts from "./accounts.js";

const router = Router();

router.use('/account', accounts());
router.use('/devices', devices());

export default router;
