# Airbnb Clone

## Deployed Application:

Heroku: https://backend-project-airbnb.herokuapp.com/

## Description

This project is a clone of Airbnb.
After logging in, a user can create a room for others to book.
A user may also book someone elses room, or write a review for it.


## API Documentation
[Link to API Docs README.md](./backend/README.md)

## Database Schema Design:

![Database Blueprint](./images//db-blueprint.png)

# Redux State Shape:

```js
store = {
    session: {},
    rooms: {
        roomId: {
            roomData,
            reviews:{
                reviewId: {
                        reviewData,
                        user: {userData for who reviewed}
                    }
            },
        },
    }
    bookings: {
        bookingId: {
            bookingData,
            user: {userData of user that booked}.
            room: {spotData for the booking}
        },
    }
    roomImages: {
        room: {images of a room}
    }

    reviewImages: {
        review: {images from a review}
    }
}
```

# Features List:

1. Rooms
2. Reviews
<!-- 3. Bookings
4. Favorites -->