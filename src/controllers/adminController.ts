import { RequestHandler } from "express";
import adminServices from "../services/adminServices";

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

const getAllUsers: RequestHandler = async (req, res) => {};

const getAllEvents: RequestHandler = async (req, res) => {};

export default {
  verifyEventCreationRequest,
  verifyEORegistration,
};
