import prisma from "../../prisma";
import { RequestHandler } from "express";

const addFocusPoint: RequestHandler = async (req, res, next) => {
  // study id, point 등등 body로 받아서 추가
  try {
  } catch (error) {
    next(error);
  }
};

export default addFocusPoint;
