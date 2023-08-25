import { supabase } from "../config/db";
import { ResponseError } from "../error/responseError";

const selectedFields = [
  "id",
  "title",
  "description",
  "category",
  "price",
  "capacity",
  "date",
  "imageUrl",
  "location",
];

const getEventById = async (id: string) => {
  const { data: event, error } = await supabase
    .from("Event")
    .select(selectedFields.join(","))
    .eq("id", id)
    .single();

  if (error) {
    throw new ResponseError(500, "Error retrieving event");
  }

  if (!event) throw new ResponseError(404, "Contact is not found");

  return event;
};

const getAllEvent = async () => {
  const { data: events, error } = await supabase
    .from("Event")
    .select(selectedFields.join(","));

  if (error) {
    throw new ResponseError(500, "Error getting events");
  }

  return events;
};

const getFilteredEvent = () => {};

const createEvent = async (data: any, organizerId: string) => {
  const { data: createdEvent, error } = await supabase
    .from("Event")
    .insert({ ...data, organizerId: "0b99a906-cc0b-40e7-824f-014316ced250" })
    .single();

  if (error) {
    throw new ResponseError(500, "Error creating event");
  }

  return createdEvent;
};

const deleteEvent = async (id: string) => {
  const { error } = await supabase.from("Event").delete().eq("id", id).single();

  if (error) {
    throw new ResponseError(500, "Error deleting event");
  }
};

export default {
  getEventById,
  getAllEvent,
  createEvent,
  getFilteredEvent,
  deleteEvent,
};
