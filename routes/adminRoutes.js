import { metodosAdmin } from "../controller/admin.js";

import { Router } from "express";

const adminRouter = Router()

adminRouter.post('/get-project', metodosAdmin.getProjectsByUId)
adminRouter.delete('/delete-project', metodosAdmin.deleteProjectById)
adminRouter.delete('/delete-user', metodosAdmin.deleteUserById)
adminRouter.put('/update-state', metodosAdmin.verifiedUserById)
adminRouter.put('/update-password', metodosAdmin.updatePasswordById)
adminRouter.put('/update-email', metodosAdmin.updateEmailById)





export default adminRouter  