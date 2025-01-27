import prisma from "../../prisma";
import { RequestHandler } from "express";
import * as s from "superstruct";
import { PatchStudy } from "../../../struct";

const updateStudy: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export default updateStudy;
