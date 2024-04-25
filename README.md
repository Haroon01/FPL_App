# FPLReloaded (MVP)
Fantasy Football Game based on the Fantasy Premier League. It is designed to allow granular configuration and customisation by the user for a tailored experience. We have taken a more free, and experimental approach where restrictions are low! 

Note: This project is still under development, it is currently at a stage where the core features are implemented, and further development is in progress.

## Development
This is developed using NodeJS, ExpressJS, ReactJS, and Sequelize (MYSQL).
These instructions assume you are using VS Code, and already have NodeJS installed and have some experience with web development in general.

1. Enter the directory you wish to clone the repository in

2. Clone the repository: ```git clone https://github.com/Haroon01/FPL_App.git```

3. Install node packages for backend ```cd ./fpl_backend``` then ```npm install``` (do the same for frontend ```cd ./fpl_frontend```)

4. Using ```.env.example``` create an environment file and fill out the variables. The database details are used for the production build

5. Set up a MySQL Server, and configure the database connection in ```./fpl_backend/config/config.js```

6. Start the SQL Server

7. Start the backend server ```cd ./fpl_backend/``` and then ```npm run dev```

8. Start the frontend ```cd ./fpl_frontend/``` and then ```npm run start```

9. A browser should open up shortly to ```http://localhost:3000/``` where the application will appear

***Note: Saving a change in ```./fpl_backend/server.js``` will automatically restart the server and apply the changes. The same applies to the frontend, any change will reload the frontend and show changes***

## Project Structure

### Backend (./fpl_backend)

ExpressJS is used for the backend server. API Endpoints are exposed to interact with the database.

* ```/models``` contains the models for the tables
* Table associations are in ```/models/associations.js``` where you can associate tables together with foreign keys
* ```/middleware``` contains any custom middleware used for some endpoints
* ```/routes/``` contain all the routes for the backend server. Endpoints are grouped into catagories containing related endpoints. **If a new route is created, it must be defined in ```server.js```**
* The API used is abstracted into a class to make it easy if the API endpoints change. This is in ```/FantasyPL.js```

### Frontend

ReactJS is used for the frontend. Components and pages are organised in their own directories. Development files are in ```./fpl_frontend/src/```

* ```/assets/``` is used to store any images/logos etc.
* ```/components/``` are used for anything that can be re-used in other pages
* ```/pages/``` contain full pages, which usually contain some components from ```/components/```

*Note: Any calls to the backend/API from the frotend must ***not*** be hardcoded. It is recommended that you create a ```config.js``` file, create a variable ```backendUrl``` and use this variable for any calls. The URL must point to the Express server with the correct port. See ```config.js.example``` for guidance*

* Global themes are defined in ```/theme.jsx``` which uses the MaterialUI framework

