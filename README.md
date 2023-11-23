# Digest Authentication

## Summary

### What is Digest Authentication?

Digest Authentication is an authentication method used to identify the user that is sending the request to the server.
Credentials are hashed using MD5 hashing method and sent through Authentication header with every request.

### How does it work?

If Authentication Header is not present in the request, user is prompted for the username and password.

When user enters username and password, they are hashed using MD5 hashing method by the browser and browser sends them with every request. When they are sent to the server, server uses Authentication Header information and password that it has stored in the DB to create a hash and it compares the hash with the response value it got from the browser. If values match, user is successfully authenticated.

As long as the browser session is active, every request will contain Authentication Header with the value of `Digest username="", realm="", nonce="", uri="", response=""` which will allow the request to access the resources of the server.

### What are Pros and Cons of using Basic Authentication?

This Authentication method is easy to implement, supported by major browsers and since credentials are hashed it is somewhat secure.

Downside of using this method is sending Credentials with every request, passwords are not secure on the server since bcrypt cannot be used and user needs to close the browser to be logged out.

## Setup

Install Prettier

```
code --install-extension esbenp.prettier-vscode
```

Install dependencies

```
npm install
```

Run server

```
npm run dev
```
