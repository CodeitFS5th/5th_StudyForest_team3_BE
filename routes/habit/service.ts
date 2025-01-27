import { Iservice } from "../../type";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getHabitList = async ({ req, res }: Iservice) => {};

export const createHabit = async ({ req, res }: Iservice) => {};

export const updateHabit = async ({ req, res }: Iservice) => {};

export const deleteHabit = async ({ req, res }: Iservice) => {};
