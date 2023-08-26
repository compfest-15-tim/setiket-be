import { supabase } from '../config/db';
import { ResponseError } from '../error/responseError';

const topupBalance = async (id: string, topupAmount: number) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('balance')
    .eq('id', id)
    .single();

  if (error) {
    throw new ResponseError(500, 'Error fetching user data');
  }

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }

  const newBalance = Number(user.balance) + Number(topupAmount);

  const { data: updatedUser, error: updateError } = await supabase
    .from('users')
    .update({ balance: newBalance })
    .eq('id', id)
    .single();

  if (updateError) {
    throw new ResponseError(500, 'Error topup balance');
  }

  return updatedUser;
};

const withdrawBalance = async (id: string, withdrawAmount: number) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('balance')
    .eq('id', id)
    .single();

  if (error) {
    throw new ResponseError(500, 'Error fetching user data');
  }

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }

  const newBalance = Number(user.balance) - Number(withdrawAmount);

  const { data: updatedUser, error: updateError } = await supabase
    .from('users')
    .update({ balance: newBalance })
    .eq('id', id)
    .single();

  if (updateError) {
    throw new ResponseError(500, 'Error withdraw balance');
  }

  return updatedUser;
};

const getUserDetails = async (id: string) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }

  return user;
};

const bookEvent = async (eventId: string, userId: string, quantity: number) => {
  console.log(eventId, userId, quantity);
  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('price, capacity, booked')
    .eq('id', eventId)
    .single();

  if (eventError) {
    throw new ResponseError(404, `Event not found ${eventError.message}`);
  }

  const availableSeats = event.capacity - event.booked;
  if (availableSeats < quantity) {
    throw new ResponseError(400, 'Not enough available seats');
  }

  const totalPrice = event.price * quantity;

  const { data: user, error: userError } = await supabase
    .from('users')
    .select('balance')
    .eq('id', userId)
    .single();

  if (userError) {
    throw new ResponseError(404, `User not found ${userError.message}`);
  }

  if (user.balance! < totalPrice) {
    throw new ResponseError(400, 'Insufficient balance');
  }

  const { data: updatedEvent, error: updateEventError } = await supabase
    .from('events')
    .update({ booked: event.booked + quantity })
    .eq('id', eventId)
    .single();

  if (updateEventError) {
    throw new ResponseError(
      500,
      `Error updating event ${updateEventError.message}`,
    );
  }

  const updatedUserBalance = user.balance! - totalPrice;

  const { data: updatedUser, error: updateUserError } = await supabase
    .from('users')
    .update({ balance: updatedUserBalance })
    .eq('id', userId)
    .single();

  if (updateUserError) {
    throw new ResponseError(
      500,
      `Error updating user ${updateUserError.message}`,
    );
  }

  const { data: transactionData, error: transactionError } = await supabase
    .from('transactions')
    .insert([
      {
        event_id: eventId,
        user_id: userId,
        amount: quantity,
      },
    ])
    .single();

  return transactionData;
};

export default {
  topupBalance,
  withdrawBalance,
  bookEvent,
  getUserDetails,
};
