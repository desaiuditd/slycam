SlyCam Meteor App
=================


# Server Sequence

1. POST `/api/post-photo/`
2. Save photo in Mongo
3. Call FACE API
4. Receive FACE API & save it in mongo.
5. Send Push Notification
6. GET `/api/whos-at-the-door/`
7. POST `/api/tag-person/`
8. POST `/api/open-door/`
9. GET `/api/check-lock-status/`
