# Lodging API Documentation

GCP IP: 34.142.157.9

DOMAIN:

Test using Postman (import):https://api.postman.com/collections/11206461-6af3078c-16da-42b4-9aac-6b994c480079?access_key=PMAT-01HFD5AD17P1FRJFKPW81YS6T7

&nbsp;

## Models :

_Admins_

```
- email: string, required, unique
- password: string, required
```

_Players_

```
- googleProfileID: string, unique, required
```

_Games_

```
- title: string, required
```

_Questions_

```
- word: string, required
- hint: string, required
- GameId: number, required
- startCoordinateX: number, required
- startCoordinateY: number, required
- direction: string, required
```

_GameSessions_

```
- GameId: number, required
- status: string, required, default: "waiting"
- link: string, required
```

_GamePlayers_

```
- PlayerId: number, required
- GameSessionId: number, required
- username: string, required
- team: string, required
- score: number, required, default: 0
```

_SessionQuestions_

```
- GameSessionId: number, required
- QuestionId: number, required
- isSolved: boolean, default: false
- SolverPlayerId: number, nullable
```

&nbsp;

## Endpoints :

List of available endpoints:

### Player

- `POST /login`
- `POST /signup`
- `GET /gameSession/:gameSessionId`
- `GET /gameSession/:gameSessionId/result`
- `GET /gameSession/:gameSessionId/:sessionQuestionsId`
- `POST /gameSession/:gameSessionId/:sessionQuestionsId`

### Admin

- `POST /admin/login`
- `GET /admin/games`
- `POST /admin/games`
- `PUT /admin/games/:id`
- `DELETE /admin/games/:id`
- `GET /admin/games/:id/open`
- `GET /admin/gameSession/:gameSessionId`
- `GET /admin/gameSession/:gameSessionId/start`
- `GET /admin/gameSession/:gameSessionId/end`
- `GET /admin/gameSession/:gameSessionId/result`

<!-- todo -->

- `GET /gameSession/:gameSessionId/:sessionQuestionsId`

&nbsp;

# Player Routes

## 0. GET /checkSession/:gameSessionId

Description:

- Checks if selected session is available

parameters:

- gameSessionId: integer

_Response (200 - OK)_

```json
{
  "message": "OK"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Game already started / ended"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Game not found"
}
```

## 1. POST /login

Description:

- Logs user in using google and returning access_token

- body:

```json
{
  "google_token": "string (required)"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
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
  "gameSessionId": "integer (required)"
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

_Response (401 - Unauthorized)_

```json
{
  "message": "Please log in"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Already registered"
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
  "data": {
    "title": "string",
    "sessionQuestions": [] | [
      {
        "GameSessionId": "number",
        "QuestionId": "number",
        "isSolved": "boolean",
        "SolverPlayerId": "number",
        "Questions": [
          {
            "word": "string",
            "hint": "string",
            "coordinates": ["number", "number"],
            "direction": "straightward" | "downward"
          }
        ],
        "Solver": "null" |  {
          "username": "string",
          "solvedAt": "date"
        }
      },
      ...
    ],
    "status": "playing | waiting | ended"
  },
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Please log in",
  "gameSessionId": "number"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Not registered",
  "gameSessionId": "number"
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
  "message": "Game already started / ended"
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
    "startCoordinateX": "number",
    "startCoordinateY": "number",
    "direction": "straightward | downward",
    "Solver": "null" | {
      "PlayerId": "number",
      "username": "string"
    },
    "clues": ["number", ...]
  },

}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Please log in",
  "gameSessionId": "number"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Not registered",
  "gameSessionId": "number"
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
  "message": "Game not started yet"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Question not found"
}
```

```json
{
  "message": "Game not found"
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
  "answer": "string (required)"
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
  "message": "Please fill the answer"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Please log in",
  "gameSessionId": "number"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Not registered",
  "gameSessionId": "number"
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
  "message": "Game not started yet"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Question not found"
}
```

```json
{
  "message": "Game not found"
}
```

## 6. GET /gameSession/:gameSessionId/result

Description:

- Get game result that has ended

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
  "data": {
    "red": {
      "players": ["string", "string", ... ],
      "score": "number"
    },
    "blue": {
      "players": ["string", "string", ... ],
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

_Response (401 - Unauthorized)_

```json
{
  "message": "Please log in",
  "gameSessionId": "number"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Not registered",
  "gameSessionId": "number"
}
```

_Response (403 - forbidden)_

```json
{
  "message": "Game not started yet"
}
```

_Response (403 - forbidden)_

```json
{
  "message": "Game not finished yet"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Game not found"
}
```

# Admin Routes

## 1. POST /admin/login (done)

Description:

- Logs user in and returning admin_token

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
  "admin_token": "string"
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

## 3. GET /admin/games

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

## 4. POST /admin/games

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
  "gameFiles": "game file (JSONs) (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Successfully created "number" game(s)"
}
```

_Response (400 - bad request)_

```json
{
  "message": "please fill the form"
}
```

_Response (400 - bad request)_

```json
{
  "message": "Invalid file(s)"
}
```

_Response (400 - bad request)_

```json
{
  "message": "Invalid Game(s)"
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

## 5. PUT /admin/games/:id

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

_Response (400 - bad request)_

```json
{
  "message": "Invalid file"
}
```

_Response (400 - bad request)_

```json
{
  "message": "Invalid Game"
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

_Response (404 - Not Found)_

```json
{
  "message": "Game not found"
}
```

## 6. DELETE /admin/games/:id

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
  "message": "please log in"
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

## 7. GET /admin/games/:id/open

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
  "id": "number"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "please login first"
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

## 9. GET /admin/gameSession/:gameSessionId

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

_Response (200 - OK)_

```json
{
  "data": {
    "title": "string",
    "link": "string",
    "qrcode": "image/xml",
    "sessionQuestions": [] | [
      {
        "GameSessionId": "number",
        "QuestionId": "number",
        "isSolved": "boolean",
        "SolverPlayerId": "number",
        "Questions": [
          {
            "word": "string",
            "hint": "string",
            "coordinates": ["number", "number"],
            "direction": "straightward" | "downward"
          }
        ],
        "Solver": "null" |  {
          "username": "string",
          "solvedAt": "date"
        }
      },
      ...
    ],
    "status": "playing | waiting | ended"
  },
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

_Response (404 - Not Found)_

```json
{
  "message": "Game not found"
}
```

## 8. GET /admin/gameSession/:gameSessionId/start

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
  "message": "please log in"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Game Already Started / Ended"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Game not found"
}
```

## 9. GET /admin/gameSession/:gameSessionId/end

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
  "message": "OK"
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

_Response (403 - Forbidden)_

```json
{
  "message": "Game not started or already ended"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Game not found"
}
```

## 10. GET /admin/gameSession/:gameSessionId/result

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
      "players": ["string", "string", ... ],
      "score": "number"
    },
    "blue": {
      "players": ["string", "string", ... ],
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
  "message": "please log in"
}
```

_Response (403 - forbidden)_

```json
{
  "message": "Game not started yet"
}
```

_Response (403 - forbidden)_

```json
{
  "message": "Game not finished yet"
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
