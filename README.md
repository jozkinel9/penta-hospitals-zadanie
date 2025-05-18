# API Documentation

## Publish Slots

**POST** `/slots/publish-slots`

### Request Body:
{
  "startDateAndTime": "2023-10-05T14:30:00Z",
  "slots": [
    { "date": "2025-10-07", "capacity": 10 },
    { "date": "2025-10-08", "capacity": 5 },
    { "date": "2025-10-09", "capacity": 10 },
    { "date": "2025-10-10", "capacity": 11 }
  ]
}

## Create Reservation
**POST** `/reservations`

### Request Body:
{
  "name": "Anna",
  "surname": "Karenina",
  "phone": "+421912345678",
  "email": "anna.novak@example.com",
  "dueDate": "2025-10-09"
}