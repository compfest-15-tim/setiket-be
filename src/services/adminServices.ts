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
    throw new ResponseError(500, "Error verifying event organizer registration");
  }

  if (!user) {
    throw new ResponseError(404, "User not found");
  }
};

const verifyEventCreationRequest = async (id: string, status: StatusEnum) => {
  const { data: event, error } = await supabase
    .from("users")
    .update({ status })
    .eq("id", id)
    .single();

  if (error) {
    throw new ResponseError(500, "Error verifying event creation request");
  }

  if (!event) {
    throw new ResponseError(404, "Event not found");
  }
};

export default {
  verifyEORegistration,
  verifyEventCreationRequest,
};
