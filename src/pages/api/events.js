let events = [
  {
    id: 1,
    text: 'Surf',
    start: '2023-07-25T12:30:00',
    end: '2023-07-25T13:30:00',
  },
  {
    id: 2,
    text: 'Reu Bernard',
    start: '2023-07-25T09:30:00',
    end: '2023-07-25T11:30:00',
  },
  {
    id: 3,
    text: 'Atelier',
    start: '2023-07-26T12:00:00',
    end: '2023-07-26T15:00:00',
  },
  {
    id: 4,
    text: 'Dej Client',
    start: '2023-07-28T11:30:00',
    end: '2023-07-28T14:30:00',
  },
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Handle GET request to fetch all events
    res.status(200).json(events);
  } else if (req.method === 'POST') {
    // Handle POST request to add a new event
    const newEvent = req.body;
    newEvent.id = events.length + 1;
    events.push(newEvent);
    res.status(201).json(newEvent);
  } else if (req.method === 'PUT') {
    // Handle PUT request to update an event
    const { id, text, start, end } = req.body;
    const updatedEvent = { id, text, start, end };
    events = events.map((event) => (event.id === id ? updatedEvent : event));
    res.status(200).json({ message: 'Event updated successfully' });
  } else if (req.method === 'DELETE') {
    // Handle DELETE request to remove an event
    const { id } = req.body;
    events = events.filter((event) => event.id !== id);
    res.status(200).json({ message: 'Event deleted successfully' });
  } else {
    // Handle other types of requests
    res.status(405).end();
  }
}
