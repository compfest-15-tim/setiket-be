import { supabase } from "../config/db";
import { ResponseError } from "../error/responseError";
import { StatusEnum } from "../types/db.schema";

const verifyEORegistration = async (id: string, status: StatusEnum) => {
  const { data: user, error } = await supabase
    .from("users")
    .update({ status })
    .eq("id", id)
    .single();

  if (error) {
    throw new ResponseError(
      500,
      "Error verifying event organizer registration"
    );
  }
};

const verifyEventCreationRequest = async (id: string, status: StatusEnum) => {
  const { data: event, error } = await supabase
    .from("events")
    .update({ status })
    .eq("id", id)
    .single();

  if (error) {
    throw new ResponseError(
      500,
      `Error verifying event creation request, ${error.message}`
    );
  }
};

const getAllEvents = async () => {
  const { data: events, error } = await supabase.from("events").select("*");

  if (error) {
    throw new ResponseError(500, "Error getting events");
  }

  return events;
};

const getAllUsers = async () => {
  const { data: users, error } = await supabase.from("users").select("*");

  if (error) {
    throw new ResponseError(500, "Error getting users");
  }

  return users;
};

export default {
  verifyEORegistration,
  verifyEventCreationRequest,
  getAllEvents,
  getAllUsers
};
