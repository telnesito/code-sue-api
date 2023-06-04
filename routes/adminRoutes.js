import { metodosAdmin } from "../controller/admin.js";

import { Router } from "express";

const adminRouter = Router()

adminRouter.post('/get-project', metodosAdmin.getProjectsByUId)


export default adminRouter