import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

interface IToken {
  id: number;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export function loginMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header) {
    res.status(401).json({
      message: "Token não informado"
    });
    return;
  }

  const parts = header.split(' ');

  if (parts.length !== 2) {
    res.status(401).json({
      message: "Token mal formatado"
    });
    return;
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET || "chave") as IToken;
    req.userId = decoded.id

    return next();
  } catch (error: any) {
    res.status(401).json("Token inválido")
    return;
  }
}