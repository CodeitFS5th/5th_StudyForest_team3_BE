import { Iservice } from "../../type";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getStudyList = async ({ req, res }: Iservice) => {};

export const getStudy = async ({ req, res }: Iservice) => {};

export const createStudy = async ({ req, res }: Iservice) => {};

export const updateStudy = async ({ req, res }: Iservice) => {};

export const deleteStudy = async ({ req, res }: Iservice) => {};

export const addFocusPoint = async ({ req, res }: Iservice) => {
  // study id, point 등등 body로 받아서 추가
};
