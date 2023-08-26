import request from 'supertest';
import app from '../app';

describe('Event Handlers', () => {
  // it("should create an event", async () => {
  //   const eventData = {
  //     title: "Samsung Keynote",
  //     description: "Annual samsung event",
  //     date: "2023-08-26 01:58:39+00",
  //     location: "Seoul, Korea",
  //     capacity: "1200",
  //     price: "250000",
  //     images: ""
  //   };

  //   const response = await request(app)
  //     .post("/create-event")
  //     .send(eventData)
  //     .expect(201);

  //   // Verify the response here
  // });

  it('should get an event by ID', async () => {
    // Replace "event_id_here" with an actual event ID
    const response = await request(app).get(
      '/api/events/bc36c4f2-d823-4133-b42c-d66a7c2b6239',
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title');
  });

  it('should return 404 for non-existent event', async () => {
    const response = await request(app).get('/api/events/bc3');
    expect(response.status).toBe(404);
  });

  it('should get all events', async () => {
    const response = await request(app).get('/api/events');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // it("should delete an event", async () => {
  //   const eventId = "event_id"; // Replace with a valid event ID

  //   const response = await request(app)
  //     .delete(`/delete-event/${eventId}`)
  //     .expect(201);
  // });
});
