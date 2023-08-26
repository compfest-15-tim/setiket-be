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

const getUserDetails: RequestHandler = async (req, res, next) => {
  const { userId } = req.body;

  try {
    const user = await userServices.getUserDetails(userId);

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const bookEvent: RequestHandler = async (req, res, next) => {
  const { userId, quantity } = req.body;
  const { id: eventId } = req.params;

  try {
    await userServices.bookEvent(eventId, userId, quantity);

    return res.status(201).json("Booking success");
  } catch (error) {
    next(error);
  }
};

export default {
  topupBalance,
  withdrawBalance,
  bookEvent,
  getUserDetails,
};
