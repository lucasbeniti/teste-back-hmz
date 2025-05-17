import { Router } from "express";
import { UserController } from "../controllers/userController";
import { loginMiddleware } from "../middlewares/loginMiddleware";

const router = Router();
const userController = new UserController();

router.post('/', userController.create.bind(userController));

router.use(loginMiddleware);
router.get('/:id', userController.findById.bind(userController));
router.get('/', userController.getPaginated.bind(userController))
router.put('/:id', userController.update.bind(userController));
router.delete('/:id', userController.delete.bind(userController));

export const userRoutes = router;