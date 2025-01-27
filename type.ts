import { Request, Response } from "express";

export interface Iservice {
  req: Request;
  res: Response;
}
