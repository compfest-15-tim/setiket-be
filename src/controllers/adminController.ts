import { RequestHandler } from "express";
import adminServices from "../services/adminServices";

const verifyEORegistration: RequestHandler = async (req, res, next) => {
  const id = "0b99a906-cc0b-40e7-824f-014316ced250";
  const { status } = req.body;

  try {
    const user = await adminServices.verifyEORegistration(id, status);

    return res.status(200).json(`Action success`);
  } catch (error) {
    console.error("Error verifying EO registration:", error);
    return res
      .status(500)
      .json("An error occurred while processing the request.");
  }
};

const verifyEventCreationRequest: RequestHandler = async (req, res, next) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const event = await adminServices.verifyEventCreationRequest(id, status);

    return res.status(200).json("Action success");
  } catch (error) {
    next(error)
  }
};

const getAllUsers: RequestHandler = async (req, res) => {

};

const getAllEvents: RequestHandler = async (req, res) => {

};

export default {
  verifyEventCreationRequest,
  verifyEORegistration,
};
