import { supabase } from "../config/db";
import { ResponseError } from "../error/responseError";

const topupBalance = async (id: string, topupAmount: number) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("balance")
    .eq("id", id)
    .single();

  if (error) {
    throw new ResponseError(500, "Error fetching user data");
  }

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  const newBalance = Number(user.balance) + Number(topupAmount);

  const { data: updatedUser, error: updateError } = await supabase
    .from("users")
    .update({ balance: newBalance })
    .eq("id", id)
    .single();

  if (updateError) {
    throw new ResponseError(500, "Error topup balance");
  }

  return updatedUser;
};

const withdrawBalance = async (id: string, withdrawAmount: number) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("balance")
    .eq("id", id)
    .single();

  if (error) {
    throw new ResponseError(500, "Error fetching user data");
  }

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  const newBalance = Number(user.balance) - Number(withdrawAmount);

  // Update the user's balance
  const { data: updatedUser, error: updateError } = await supabase
    .from("User")
    .update({ balance: newBalance })
    .eq("id", id)
    .single();

  if (updateError) {
    throw new ResponseError(500, "Error withdraw balance");
  }

  return updatedUser;
};

export default {
  topupBalance,
  withdrawBalance,
};
