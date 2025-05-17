import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService();
  }

  async findById(req: Request, res: Response) {
    try{
      const user = await this.userService.findById(parseInt(req.params.id));

      res.status(200).json(user);
    } catch (error: any) {
      if (error.message === "Usuário não encontrado") {
        res.status(404).json({
          message: error.message
        });
      }

      res.status(500).json({
        message: error.message || "Erro do servidor"
      });
    }
  }

  async create(req: Request, res: Response) {
    try{
      const data = req.body;
      const user = await this.userService.create(data)

      res.status(201).json(user);
    } catch (error: any) {
      if (error.message === "Esse e-mail já está sendo utilizado em outro usuário") {
        res.status(409).json({
          message: error.message
        });
      }

      res.status(500).json({
        message: error.message || "Erro do servidor"
      });
    }
  }

  async delete (req: Request, res: Response) {
    try{
      await this.userService.delete(parseInt(req.params.id));

      res.status(204).send();
    } catch (error: any) {
      if (error.message === "Usuário não encontrado") {
        res.status(404).json({
          message: error.message
        });
      }

      res.status(500).json({
        message: error.message || "Erro do servidor"
      });
    }
  }
}