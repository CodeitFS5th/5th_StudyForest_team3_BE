import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getHabitList: RequestHandler = async (req, res) => {};

export const createHabit: RequestHandler = async (req, res) => {};

export const updateHabit: RequestHandler = async (req, res) => {};

export const deleteHabit: RequestHandler = async (req, res) => {};
