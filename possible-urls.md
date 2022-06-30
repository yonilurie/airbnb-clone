GET /users/:userId  --Get current user

POST /login --Log in a User

POST /register  --Register a user

GET /rooms  --Get all spots

GET /users/:userId/rooms  --Get all spots owned by a user

GET /rooms/:roomId -- Get details about spot from id

POST /rooms/add --Add a spot

PUT /rooms/:roomId --Edit a spot

DELETE /rooms/:roomId --Delete a spot

GET /users/:userId/reviews --Get all reviews by a user

GET /rooms/:roomId/reviews --Get all reviews from a spot

POST /rooms/:roomId/reviews --Add a review for a spot

PUT /rooms/:roomId/reviews/:reviewId --Edit a review

DELETE /rooms/:roomId/reviews/:reviewId --Delete a review by ID

GET /users/:userId/bookings --Get all of a users bookings

GET /rooms/:roomId/bookings --Get all of a spots bookings

POST /rooms/:roomId/bookings --Create a booking at a spot

PUT /users/:userId/bookings/:bookingId --Update an existing booking

DELETE /users/:userId/bookings/:bookingId --Delete an existing booking

POST /users/:userId/rooms/:roomId --Add an image to a spot

POST /rooms/:roomId/reviews/:reviewId --Add an image to a review

DELETE /users/:userId/images/:imageId --Delete an image

GET /rooms/search?page=?&size=?&minLat=?&maxLat=?&minLng=?%&maxLng=?&minPrice=?&maxPrice=?


