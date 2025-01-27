import prisma from "../../prisma";
import { RequestHandler } from "express";

const deleteStudy: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export default deleteStudy;
