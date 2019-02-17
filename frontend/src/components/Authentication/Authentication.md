# 1. Authentication/Authorization

On the client, there are two flows:

1. Login
2. Register

Respectivley, these two are the "gateway" to using the app. Login will take a users provided credentials, verify them, and pass back a message on the status of the Login request. Register will take a the information provided and try to create a new user based on what was passed. Register also takes back a message on the status of the Register request. Both of these are send via `POST` to API Layer. The message a user should get back looks like:

Login:
```javascript
{
    code: 200,
    message: "Login Successful"
}
```
or will receive:
```javascript
{
    code: 401,
    message: "Login Failed"
}
```

For a user registering the messages are similar. Register returns:
```javascript
{
    code: 201,
    message: "Registration Success"
}
```
or will receive:
```javascript
{
    code: 400,
    message: "Registration Failed"
}
```
Each of these will have the corresponding code set as the status.

