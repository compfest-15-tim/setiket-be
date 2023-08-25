import { RequestHandler } from "express";
import userServices from "../services/userServices";

const topupBalance: RequestHandler = async (req, res, next) => {
  const { userId, amount } = req.body;

  try {
    await userServices.topupBalance(userId, amount);

    return res.status(200).json("Topup Success");
  } catch (error) {
    next(error);
  }
};

const withdrawBalance: RequestHandler = async (req, res, next) => {
  const { userId, amount } = req.body;

  try {
    await userServices.withdrawBalance(userId, amount);

    return res.status(200).json("Withdraw Success");
  } catch (error) {
    next(error);
  }
};

export default {
  topupBalance,
  withdrawBalance,
};
