import { RequestHandler } from "express";
import adminServices from "../services/adminServices";
import { validateSchema } from "../lib/utils";

const verifyEORegistration: RequestHandler = async (req, res, next) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    await adminServices.verifyEORegistration(id, status);

    return res.status(200).json(`OK`);
  } catch (error) {
    next(error);
  }
};

const verifyEventCreationRequest: RequestHandler = async (req, res, next) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    await adminServices.verifyEventCreationRequest(id, status);

    return res.status(200).json("OK");
  } catch (error) {
    next(error);
  }
};

const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await adminServices.getAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getAllEvents: RequestHandler = async (req, res, next) => {
  try {
    const events = await adminServices.getAllEvents();

    return res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

export default {
  verifyEventCreationRequest,
  verifyEORegistration,
  getAllUsers,
  getAllEvents,
};
