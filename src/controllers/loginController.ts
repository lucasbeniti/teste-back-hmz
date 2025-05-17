import { Request, Response } from "express";
import { LoginService } from "../services/loginService";

export class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  async login(req: Request, res: Response) {
    try{
      const result = await this.loginService.login(req.body);

      res.status(200).json(result);
    } catch (error: any) {
      if (error.message === "Credenciais inválidas") {
        res.status(400).json({
          message: "Credenciais inválidas"
        })
        return;
      }

      res.status(500).json({
        message: error.message || "Erro do servidor"
      });
    }
  }
}