import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();
const userController = new UserController();

router.get('/:id', userController.findById.bind(userController));
router.post('/', userController.create.bind(userController));
router.delete('/:id', userController.delete.bind(userController));

export const userRoutes = router;