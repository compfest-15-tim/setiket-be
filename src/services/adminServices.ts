import { supabase } from "../config/db";
import { ResponseError } from "../error/responseError";

const verifyEORegistration = async (id: string, status: string) => {
  const { data: user, error } = await supabase
    .from("User")
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

const verifyEventCreationRequest = async (id: string, status: string) => {
  const { data: event, error } = await supabase
    .from("Event")
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
