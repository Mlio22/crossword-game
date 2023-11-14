# Lodging API Documentation

GCP IP:

DOMAIN:

Test using Postman (import):

&nbsp;

## Models :

_Admins_

```
- email: string, required, unique
- password: string, required
```

_Players_

```
- googleProfileID: string, required
```

_Games_

```
- title: string, required
```

_Questions_

```
- word: string, required
- GameId: number, required
- startCoordinateX: number, required
- startCoordinateY: number, required
- direction: string, required
```

_GameSessions_

```
- GameId: number, required
- status: string, required
```

_GamePlayers_

```
- PlayerId: number, required
- GameSessionId: number, required
- username: string, required
- team: string, required
- score: number, default: 0
```

_SessionQuestions_

```
- GameSessionId: number, required
- QuestionId: number, required
- isSolved: boolean, default: false
- solverPlayerId: number, nullable
```

&nbsp;

## Endpoints :

List of available endpoints:

### Player

- `POST /login`
- `POST /signup`
- `GET /games/:gameId`
- `GET /games/:gameId/:questionID`
- `POST /games/:gameId/:questionID`
- `GET /logout`

### Admin

- `POST /admin/login`
- `GET /admin/logout`
- `GET /admin/games`
- `POST /admin/games`
- `PUT /admin/games/:id`
- `DELETE /admin/games`
- `GET /admin/games/:id`
- `GET /admin/games/:id/open`
- `GET /admin/games/:gameId/start`
- `GET /admin/games/:gameId/end`
- `GET /admin/games/:gameId/result`
- `GET /admin/histories`
- `GET /admin/histories/:id`
- `DELETE /admin/histories/:id`

&nbsp;

# User Routes

## 1. POST /login

Description:

- Logs user in and returning access_token

- body:

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Please fill the login form"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Wrong email / password"
}
```

&nbsp;

## 2. POST /signup

Description:

- Logs user in to the game with username

- body:

```json
{
  "username": "string (required)",
  "gameId": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "OK"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Please fill the username"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Duplicate name"
}
```

## 3. GET /gameSession/:gameSessionId

Description:

- Get game with desired gameId

parameters:

- gameSessionId: integer

headers:

```json
{
  "authorization": "Bearer <JWT_TOKEN>"
}
```

_Response (200 - OK)_

```json
{
  "data": ["sessionQuestionID1", "sessionQuestionID2", ...],
  "status": "playing | waiting | ended"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Not registered"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Game already started / closed"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Game not found"
}
```

## 4. GET /gameSession/:gameSessionId/:sessionQuestionId

Description:

- Get question with desired ID
- If question solved, then the solver (gamePlayer) with be revealed

parameters:

- gameSessionId: integer
- sessionQuestionId: integer

headers:

```json
{
  "authorization": "Bearer <JWT_TOKEN>"
}
```

_Response (200 - OK)_

```json
{
  "data": {
    "word": "string",
    "GameId": "number",
    "startCoordinate": ["number", "number"],
    "direction": "straightward | downward"
  },
  "solver": "null" | {
    "PlayerId": "number",
    "username": "string"
  }
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Not registered"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Question not found"
}
```

## 5. POST /gameSession/:gameSessionId/:sessionQuestionId

Description:

- Checks player answer to server on selected question

parameters:

- gameSessionId: integer
- sessionQuestionId: integer

Request:

headers:

```json
{
  "authorization": "Bearer <JWT_TOKEN>"
}
```

body:

```json
{
  "answer": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "correct | wrong | already solved"
}
```

_Response (400 - bad request)_

```json
{
  "message": "Must fill the answer"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Not registered"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Question not found"
}
```

## 6. GET /gameSession/:gameSessionId/result

Description:

- Get game result that has ended

parameters:

- gameId: integer

headers:

```json
{
  "authorization": "Bearer <JWT_TOKEN>"
}
```

_Response (200 - OK)_

```json
{
  "data": {
    "red": {
      "players": ["playerObject1", "playerObject2", ... ],
      "score": "number"
    },
    "blue": {
      "players": ["playerObject1", "playerObject2", ... ],
      "score": "number"
    }
  },
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Game not found"
}
```

## 7. GET /logout

Description:

- Logs player out of their google account

headers:

```json
{
  "authorization": "Bearer <JWT_TOKEN>"
}
```

_Response (200 - OK)_

```json
{
  "message": "logged out succesfully"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

# Admin Routes

## 1. POST /login

Description:

- Logs user in and returning access_token

Request:

- body:

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Please fill the login form"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Wrong email / password"
}
```

&nbsp;

## 2. GET /logout

Description:

- Logs admin out

headers:

```json
{
  "authorization": "Bearer <JWT_TOKEN>"
}
```

_Response (200 - OK)_

```json
{
  "message": "logged out succesfully"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

## 3. GET /games

Description:

- Gets list of games

headers:

```json
{
  "authorization": "Bearer <JWT_TOKEN>"
}
```

_Response (200 - OK)_

```json
{
  "data": [
    {
      "id": "number",
      "title": "string"
    },
    ...
  ]
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "please sign in"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

## 4. POST /games

Description:

- Adds new game

headers:

```json
{
  "authorization": "Bearer <JWT_TOKEN>"
}
```

body:

```json
{
  "name": "string (required)",
  "gameFile": "game file (JSON) (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "OK"
}
```

_Response (400 - bad request)_

```json
{
  "message": "please fill the form"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "please log in"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

## 5. PUT /games/:id

Description:

- Updates selected game

parameters

- id: integer

headers:

```json
{
  "authorization": "Bearer <JWT_TOKEN>"
}
```

body:

```json
{
  "name": "string (optional)",
  "gameFile": "game file (JSON) (optional)"
}
```

_Response (200 - OK)_

```json
{
  "message": "OK"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "please"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Game not found"
}
```

## 6. DELETE /games/:id

Description:

- Deletes selected game

parameters

- id: integer

headers:

```json
{
  "authorization": "Bearer <JWT_TOKEN>"
}
```

body:

_Response (200 - OK)_

```json
{
  "message": "OK"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "forbidden"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Game not found"
}
```

## 7. GET /games/:id/open

Description:

- Opens selected game

parameters

- id: integer

headers:

```json
{
  "authorization": "Bearer <JWT_TOKEN>"
}
```

body:

_Response (200 - OK)_

```json
{
  "data": {
    "url": "string",
    "qrCode": "object",
  }
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "forbidden"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Game not found"
}
```

## 7. GET /games/:id/open

Description:

- Opens selected game

parameters

- id: integer

headers:

```json
{
  "authorization": "Bearer <JWT_TOKEN>"
}
```

body:

_Response (200 - OK)_

```json
{
  "data": {
    "url": "string",
    "qrCode": "object",
  }
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "forbidden"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Game not found"
}
```

## 8. GET /gameSession/:gameSessionId/start

Description:

- Starts selected gameSession

parameters

- gameSessionId: integer

headers:

```json
{
  "authorization": "Bearer <JWT_TOKEN>"
}
```

body:

_Response (200 - OK)_

```json
{
  "message": "OK"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "forbidden"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Game not found"
}
```

## 9. GET /gameSession/:gameSessionId

Description:

- Gets All Question data from selected game

parameters

- gameSessionId: integer

headers:

```json
{
  "authorization": "Bearer <JWT_TOKEN>"
}
```

body:

_Response (200 - OK)_

```json
{
  "data": ["questionID1", "questionID2", ...],
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "forbidden"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Game not found"
}
```

## 9. GET /gameSession/:gameSessionId/end

Description:

- Ends selected game session

parameters

- gameSessionId: integer

headers:

```json
{
  "authorization": "Bearer <JWT_TOKEN>"
}
```

body:

_Response (200 - OK)_

```json
{
  "message": "OK",
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "forbidden"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Game not found"
}
```

## 10. GET /gameSession/:gameSessionId/result

Description:

- Get game result from selected id

parameters

- gameSessionId: integer

headers:

```json
{
  "authorization": "Bearer <JWT_TOKEN>"
}
```

body:

_Response (200 - OK)_

```json
{
  "data": {
    "red": {
      "players": ["playerObject1", "playerObject2", ... ],
      "score": "number"
    },
    "blue": {
      "players": ["playerObject1", "playerObject2", ... ],
      "score": "number"
    }
  },
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - forbidden)_

```json
{
  "message": "forbidden"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Game not found"
}
```

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Please sign in"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

