# RESTful-chat

> This project is a real-time chat application developed using Django REST Framework (DRF) for the backend, Channels for handling WebSockets, Uvicorn as the ASGI server, and React with TypeScript for the frontend.


### Features

- __User Authentication:__ Allows users to sign up, log in, and manage their profiles securely.
- __Category-wise servers:__  Displays a wide range of categories. There are servers belonging to each category.
- __Channels:__  There are multiple channels in each server. Multiple users can join a channel to chat in realtime.
- __Server management:__ Users can create their own server belonging to the given categories. Users must join the server before chatting.
- __Chat history and storage:__ All the chats are displayed along with timestamp. Chats are stored in database.
- __Group chat functionality:__ Users can chat in groups in real time.
