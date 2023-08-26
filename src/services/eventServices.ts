import { supabase } from '../config/db';
import { EventQuery } from '../controllers/eventController';
import { ResponseError } from '../error/responseError';

const selectedFields = [
  'id',
  'title',
  'description',
  'category',
  'price',
  'capacity',
  'booked',
  'date',
  'images',
  'location',
];

const getEventById = async (id: string) => {
  const { data: event, error } = await supabase
    .from('events')
    .select(selectedFields.join(','))
    .eq('id', id)
    .eq('status', 'VERIFIED')
    .single();

  if (error) {
    throw new ResponseError(500, 'Error retrieving event');
  }

  if (!event) throw new ResponseError(404, 'Contact is not found');

  return event;
};

const getAllEvent = async () => {
  const { data: events, error } = await supabase
    .from('events')
    .select(selectedFields.join(','))
    .eq('status', 'VERIFIED');

  if (error) {
    throw new ResponseError(500, 'Error getting events');
  }

  return events;
};

const getFilteredEvent = async (
  location: string | undefined,
  category: string | undefined,
  date: string | undefined,
) => {
  let events;

  // Construct the filtering conditions based on provided filters
  let filter = {};
  if (location) {
    filter = { ...filter, location };
  }
  if (category) {
    filter = { ...filter, category };
  }
  if (date) {
    filter = { ...filter, date };
  }

  // Use Supabase to fetch filtered events
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('location', location)
    .eq('category', category);
  // .eq("date", date);

  if (error) {
    throw new ResponseError(
      500,
      `Error getting filtered events ${error.message}`,
    );
  }

  events = data;

  return events;
};

// ROLE EO n ADMIN
const createEvent = async (data: any, organizerId: string) => {
  const { data: createdEvent, error } = await supabase
    .from('events')
    .insert({ ...data, organizerId })
    .single();

  console.log(data);

  if (error) {
    throw new ResponseError(500, `Error creating event: ${error.message}`);
  }

  return createdEvent;
};

const deleteEvent = async (id: string) => {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id)
    .single();

  if (error) {
    throw new ResponseError(500, 'Error deleting event');
  }
};

export default {
  getEventById,
  getAllEvent,
  createEvent,
  getFilteredEvent,
  deleteEvent,
};
