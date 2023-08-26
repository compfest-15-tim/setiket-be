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
    const images = await imageUploadServices.imageUpload(imageFiles);

    const createdEvent = await eventServices.createEvent(
      {
        ...eventData,
        images,
      },
      userId
    );

    return res.status(201).json("Event Created");
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
  const { date, location, category } = req.query as EventQuery;
  try {
    let events;

    if (date || location || category) {
      // Only use the filters that are provided
      events = await eventServices.getFilteredEvent(location, category, date);
    } else {
      events = await eventServices.getAllEvent();
    }

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

export interface EventQuery {
  date?: string;
  location?: string;
  category?: string;
}
