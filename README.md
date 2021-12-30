# Saibanchou
[![.github/workflows/node.js.yml](https://github.com/TheLe0/AuthPI/actions/workflows/node.js.yml/badge.svg)](https://github.com/TheLe0/AuthPI/actions/workflows/node.js.yml)

Saibanchou is a REST API made on Node for authenticate and authorize users. You no longer have to hurry with authentication and authorizations in your APIs and services, saibanchou can handle this for you.
The name saibanchou came from the anime/game called Ace Attorney that is about lawyers. The  saibanchou is the judge, he decides if someone is guilty or not, like in this API, is responsible to decide if someone is authorizad/authenticated to do something or not.

## How it works

Both the authentication and authorization are middlewares, they are executed before each request, if fails on the validations, the request is not made and returns an error. 

### Authentication

When you access the login endpoint, if the credentials match to what is stored in database, is going to generate a JWT that you can use in the others endpoints in the authentication header as a Bearer Token. In the claims of the token is stored the e-mail name and the role of the user that did the login. When you make a request it validates if the token did not expired yet, if so, you must generate another token. 

### Authorization

The authorization is responsible to validate the policiesof the sysstem, if the user have permission to access some resource or do some request. Is compared if the role of the user, stored on the claims of the token, match to one of the roles allowed to the executed request, specified on the routes file.

## Prerequisites

1. Node
2. Yarn
3. Docker
4. Npx

## Installation

1. Create a ```.env``` file on the project root, and set the enviroment variables like the ```.env-example``` file.

Where:

* <b>SERVER</B> the host that is going to run the application, if is local you can put ```localhost``` or ```127.0.0.1```.

* <b>PORT</B> the server port to listen your application, normally is used ```3000```, ```8000``` or ```8080```. You must validate before if is already something running in this port on your machine, if so, the application is not going to run.

* <b>DATABASE_URL</B> this is generated by prisma when you start the migration, is the connection string to the ORM connect to your database, is something like this ```postgresql://postgres:postgres@localhost:5432/USER_API?schema=public```.

* <b>SALT</B> this is a number where you specify the number of rounds of the salt when you use bcrypt.

* <b>JWT_ALGORITHM</B> this is the algorithm used to generate and verify the JWTs, you should use ```RS256``` because this API was made using symetric and asymetric key pairs. You can use other algorithm, just verify if it needs just one key or a pair.

For generating the public and private keys you need to run the following commands:

```bash
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
# Don't add passphrase
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
cat jwtRS256.key # JWT_PRIVATE_KEY
cat jwtRS256.key.pub # JWT_PUBLIC_KEY
```
* <b>JWT_PRIVATE_KEY</B> This key is used to generate a new token. You should use what was printed in the terminal after the first ```cat```command.

* <b>JWT_PUBLIC_KEY</B> This key is used to validate the token. You should use what was printed in the terminal after the last ```cat```command.

><b>Note:</b>
> If you opt to another algorithm, a symetric one that needs just a single key like HS256,
> you can use the same key for the JWT_PRIVATE_KEY and  JWT_PUBLIC_KEY for not need to change the code.

* <b>JWT_EXPIRATION</B> time in seconds for the token to expire, used ```84600``` as example.

* <b>SUPER_USER_EMAIL</B> The e-mail for the super user, use the e-mail of whose is going to be the sysadmin of the API.

* <b>SUPER_USER_NAME</B> A name for identification of the super user, this is only for identifications purposes.

* <b>SUPER_USER_PASSWORD</B> The password for the super user.

* <b>REDIS_HOST</B> The host where the redis server is running, the default is on the ``localhost```.

* <b>REDIS_PORT</B> The port on the host where the redis is running. The default is on the port ``6379```. If you are running the redis on docker, you must define the same port as on the ``docker-compose.yml``` file.

* <b>REDIS_PASS</B> The password for the redis server, if has one. This field can be empty if has no password.

* <b>REDIS_DB</B> The name of the database on redis, you can specify whatever name you want to identify the data.

* <b>REDIS_EXPIRATION_MODE</B> The expiration mode of the register, if you wan to set an expiration put ``EX``` as the value.

* <b>REDIS_TIME_TO_EXPIRE</B> The time in seconds of the expiration of the register, for example ``600```, as 10 minutes.

2. Run the command below for install all the dependencies of the project.

```bash
yarn
```

3. Run the command below to create the container for the postgres database. And create a new database named ```USER_API``` on postgres.

```bash
docker-compose up -d
```

4. Run the prisma migrations, this is going to execute all the migrations, creating all the database structure.c

```bash
yarn db:migrate
```

5. Seed the data on prisma to create the super user on the system  with the command below.

```bash
yarn db:seed
```

6. Execute the tests to see if is everything fine and working.

```bash
yarn test
```

7. Now you can run the application, in development mode or in production mode.

#### Development Mode
```bash
yarn start:dev
```

#### Production Mode
```bash
yarn start:prod
```

## Database Structure

+ User

| Field        | Type       |  Constraints       |
|--------------|------------|--------------------|
| id           | uuid       |     Primary Key    |
| email        | string     |     Unique         |
| name         | string     |                    |
| role         | string     |                    |

+ Token

| Field        | Type       |  Constraints       |
|--------------|------------|--------------------|
| id           | uuid       |     Primary Key    |
| userId       | uuid       |     Foreign Key    |
| refreshToken | string     |                    |
| device       | string     |                    |
| expiration   | datetime   |                    |

## Endpoints

Here is where is described all the application endpoints, parameters and bodies.

> Note:
> All the endpoints, except the login one is needed to
> use a Bearer authentication token. This token you 
> receive as the response for the login endpoint

### GET

* ```/``` : The home endpoint, only used to see if the server is up and running. The output of this endpoint is going to be a 202 code response code with the following body:

```json
{
    "Made with 💙 by TheLe0"
}
```

* ```/user``` : List all the users stored in the database.
The response of this endpoint is something like this:

```json
[
	{
		"name": "User name 1",
		"email": "user1@email",
		"role": "some_role"
	},
	{
		"name": "User name 2",
		"email": "user2@email",
		"role": "some_another_role"
	}
]
```

* ```/user/:email/``` : Find a user by his email. The response of this endpoint is something like this:

```json
{
    "name": "User name 1",
    "email": "user1@email",
    "role": "some_role"
}
```

* ```/users/:role/``` : List all users with a specific role. The response of this endpoint is something like this:

```json
[
	{
		"name": "User name 1",
		"email": "user1@email",
		"role": "some_role"
	},
	{
		"name": "User name 2",
		"email": "user2@email",
		"role": "some_role"
	}
]
```

### POST

* ```/user/login``` : Endpoint for doing the login.

The request body is something like this:

```json
{
    "email": "user1@email",
    "password": "my_password"
}
```

And the response, if the credentials match with the database, is going to generate the JWT token to be used in the other endpoints as authentication.

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJMZW9uYXJkbyAgVG9zaW4iLCJlbWFpbCI6ImxidG9zaW5AdWNzLmJyIiwicm9sZSI6InN5c2FkbWluIn0sImlhdCI6MTYzOTk1NzI5NywiZXhwIjoxNjQwMDQxODk3fQ.nxeKM_gkncrH9BfLBHZ95AjIjsajj47WeMQI3drLrcU"
}
```

* ```/user``` : Endpoint for create a new user in the database.

Request body:


```json
{
	"email": "user@email.com",
	"name": "User name",
	"role": "some_role",
	"password": "user_password"
}
```

And the response is going to be the user created, only with the public fields, id and password are private.


```json
{
	"email": "user@email.com",
	"name": "User name",
	"role": "some_role"
}
```

### PUT

* ```/user``` : Update all the public information of the user (email, name and role). The update is by the email on the claims of the JWT used for the request.

Request body:


```json
{
	"email": "user@email.com",
	"name": "User name",
	"role": "some_role"
}
```

And the response is going to return with the same fields as the request.


```json
{
	"email": "user@email.com",
	"name": "User name",
	"role": "some_role"
}
```

### PATCH

The <b>PATCH</b> REST method, is similar as the <b>UPDATE</b> one, but the update is for updating all the fields, and patch just some specific one.

* ```/user``` : Endpoint for change the user password. Like the update one, the user that is going to be affected is the one of the email on the JWT.

Request body:


```json
{
	"old_password": "123",
	"new_password": "321"
}
```

And the response is going to return a status code 202 with a message that the execution was successfully completed.

```json
{
	"The password was successfully updated!"
}
```

### DELETE

* ```/user/:email/``` : Delete a user by the email on the endpoint. The response of the request is going to be a status code 202 with the following message:

```json
{
	"The user was successfully deleted!"
}
```

## Next Steps

The project is not over, there are some new features that are going to be featured on the next versions:

- [X] Use redis to cache the information
- [ ] Implement refresh tokens
- [X] Change the algorithm of the JWT to RS256
- [X] Implement authorization by roles
