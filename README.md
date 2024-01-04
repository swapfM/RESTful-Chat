# RESTful-chat

> This project is a real-time chat application developed using Django REST Framework (DRF) for the backend, Channels for handling WebSockets, Uvicorn as the ASGI server, and React with TypeScript for the frontend.


### Features

- __User Authentication:__ Allows users to sign up, log in, and manage their profiles securely.
- __Category-wise servers:__  Displays a wide range of categories. There are servers belonging to each category.
- __Channels:__  There are multiple channels in each server. Multiple users can join a channel to chat in realtime.
- __Server management:__ Users can create their own server belonging to the given categories. Users must join the server before chatting.
- __Chat history and storage:__ All the chats are displayed along with timestamp. Chats are stored in database.
- __Group chat functionality:__ Users can chat in groups in real time.


### Technologies Used

- __Frontend:__ React TypeScript
- __Backend:__ Django Rest Framework, Uvicorn, Django-Channels
- __Database:__ PostgreSQL


### Getting Started

-  Clone the repository
```
git clone https://github.com/swapfM/RESTful-Chat.git
```

- Set up and run the `frontend` server
```
npm install
cd frontend
npm install
```
- Navigate to the `backend` directory.

- Set up a virtual environment (recommended)
```
python -m venv env
.\env\Scripts\activate
```
- Run `pip install -r requirements.txt` to install Python dependencies.
- Configure the database settings to connect to PostgreSQL.
- Run `python manage.py migrate` to apply migrations.
- Run `uvicorn backend.asgi:application --port 8000` to start the backend server.

### Env Variables

Create a .env file in the root and add the following variables

```
DB_NAME = database user_name
DB_PASS = database password
DB_HOST = database host_url_endpoint
DB_PORT = database port

```


