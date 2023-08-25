import { supabase } from "../config/db";

const verifyEORegistration = async (id: string, status: string) => {
  try {
    const { data: user, error } = await supabase
      .from("User")
      .update({ status })
      .eq("id", id)
      .single();

    if (error) {
      throw new Error("Error fetching user data: " + error.message);
    }

    if (!user) {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error in verifyEORegistration:", error);
    throw error;
  }
};

const verifyEventCreationRequest = async (id: string, status: string) => {
  try {
    const { data: event, error } = await supabase
      .from("Event")
      .update({ status })
      .eq("id", id)
      .single();

    if (error) {
      throw new Error("Error fetching event data: " + error.message);
    }

    if (!event) {
      throw new Error("Event not found");
    }
  } catch (error) {
    console.error("Error in verifyEventCreationRequest:", error);
    throw error;
  }
};

export default {
  verifyEORegistration,
  verifyEventCreationRequest,
};
