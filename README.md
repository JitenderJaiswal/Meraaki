# Meraaki

## Intro
A simple CRUD interface for a single entity say users. make the following endpoint<br/>
1.post to create a users<br/>
2.get to get a particular user<br/>
3.update endpoint to update user<br/>
4.get all to get all the users<br/>


## Run
serverless offline .<br/>


## API
1. http://localhost:3000/dev/api/v1/users/signup <br/>
2. http://localhost:3000/dev/api/v1/users/login <br/>
3. http://localhost:3000/dev/api/v1/users/update <br/>
4. http://localhost:3000/dev/api/v1/users/allUsers <br/>

## Tech Stack
. serverless framework( aws lambda fn)<br/>
. nodejs<br/>
. MongoDB Atlas Database<br/>
. Express Framework

## Folder Structure
├───config<br/>
├───controllers<br/>
│   └───api<br/>
│       └───v1<br/>
├───models<br/>
└───routes<br/>
    └───api<br/>
        └───v1<br/>
