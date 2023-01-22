# Cocktails Full CRUD Full Stack App

- Use Express to build a server
- Use Mongoose to communicate with mongoDB
- Full CRUD functionality on our cocktails resource
- User Authentication
- The ability to add comments to cocktails

I'm using the MVC system for organizing my code, by breaking the app down into Models, Views, and Controllers.

## Route Tables for Documents

#### Cocktails

| **URL**               | **HTTP Verb** | **Action** |
|-----------------------|---------------|------------|
| /cocktails            | GET           | index      |
| /cocktails/:id        | GET           | show       |
| /cocktails/new        | GET           | new        |
| /cocktails            | POST          | create     |
| /cocktails/:id/edit   | GET           | edit       |
| /cocktails/:id        | PATCH/PUT     | update     |
| /cocktails/:id        | DELETE        | destroy    |

#### Comments

| **URL**                                 | **HTTP Verb** | **Action** |
|-----------------------------------------|---------------|------------|
| /comments/:cocktailId                   | POST          | create     |
| /comments/delete/:cocktailId/:commentId | GET           | destroy    |

#### Users

| **URL**            | **HTTP Verb** | **Action** |
|--------------------|---------------|------------|
| /users/signup      | GET           | new        |
| /users/login       | GET           | login      |
| /users/signup      | POST          | create     |
| /users/login       | POST          | create     |
| /users/logout      | DELETE        | destroy    |

#### ERD

![entityRelationshipDiagram](images/Cockails%20ERD.png)