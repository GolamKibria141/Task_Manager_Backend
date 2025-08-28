## Installation Workflow

We are using **mongoose + express + node.js** for this project. To install project in local server,

Note: You need to have access of the project over **github**

First clone the repo,

    git clone https://github.com/GolamKIBRI4/Task_management_Backend.git

After cloning the repository, navigate into the project directory:

     cd <project-name>

If you use npm use,

    npm install

Install all dependency using,

    yarn install

setup **Env** variable

note: these are confidential data but I am sharing them for test purpose

create a **.env** file inside the project directory

paste the below lines inside **.env**

     MONGO_URI=mongodb+srv://gk599625:EkYgQUgXkMUtBj43@cluster0.vtgdrlb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
     JWT_SECRET=superSecret123
     JWT_EXPIRE=1d


Runnig the backend

If using npm

      npm start

If using yarn

      yarn start

Optional: Install Dependencies Globally **(if necessary)**

      npm install -g nodemon

Start the server:

       npx nodemon

     



