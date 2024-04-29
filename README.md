# TimeTracker



## Backend Environment Setup Locally (with docker)

Cd into /backend
- Install Docker

- Cd into backend/TimeTracker
  run ```docker-compose up```
 I followed this repo to get this setup: https://github.com/DanielArian/django-mysql-docker

- access server on http://localhost:8000
  
## Backend Environment Setup Locally (without docker)

Cd into /backend
- Install MySQL
  - Get MySQL with Homebrew `brew install mysql`
- Install pip and python 3.8
  - install Python packages: `pip install -r requirements.txt`
- Rename .env.local to .env
- Cd into backend/TimeTracker
- run
  ```
  python manage.py migrate 
  python manage.py runserver
  ```


## Frontend Environment Setup and Usage

- CD into frontend/timetracker-app
- run ```npm install```
- run ```npm run dev```
- access app on http://localhost:3000
- Click register to register your self as user
- Then login with credentials
- Add some task by clicking add task button
- Select a date to display the task for that week, need to refresh everytime you add a new task
