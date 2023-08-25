import { RequestHandler } from "express";
import { z } from "zod";
import { eventCreationSchema } from "../dtos/validation.schema";
import eventServices from "../services/eventServices";
import imageUploadServices from "../services/imageUploadServices";

const createEvent: RequestHandler = async (req, res, next) => {
  const { userId } = req.body;
  const eventData = eventCreationSchema.parse(req.body);
  const imageFiles = req.files as Express.Multer.File[];

  try {
    const imageUrl = await imageUploadServices.imageUpload(imageFiles);

    const createdEvent = await eventServices.createEvent(
      {
        ...eventData,
        imageUrl,
      },
      userId
    );

    return res.status(201).json(createdEvent);
  } catch (error) {
    next(error);
  }
};

const getEventById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const event = await eventServices.getEventById(id);

    return res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

const getAllEvent: RequestHandler = async (req, res, next) => {
  const { date, location, category } = req.query;

  // if (date || location || category) {
  //   return await eventServices.getFilteredEvent();
  // }
  // console.log(date, location, category)
  try {
    const events = await eventServices.getAllEvent();

    return res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

const deleteEvent: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    await eventServices.deleteEvent(id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export default {
  createEvent,
  getEventById,
  getAllEvent,
  deleteEvent,
};
