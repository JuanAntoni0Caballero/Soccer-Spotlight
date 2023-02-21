Endpoints

| HTTP Method | URL Path                           | Description                                         | JSON |
|-------------|------------------------------------|-----------------------------------------------------|------|
| GET         | /                                  | Index page                                          |      |
| GET         | /sign-in                           | New user form render                                |      |
| POST        | /sign-in                           | New user form handler                               |      |
| GET         | /log-in                            | User log in form render                             |      |
| POST        | /log-in                            | User log in form handler                            |      |
| POST        | /log-out                           | User log out form handler                           |      |
| GET         | /users                             | Users list                                          |      |
| GET         | /users/:id                         | User details (profile)                              |      |
| GET         | /users/:id/edit                    | Edit user form render                               |      |
| POST        | /users/:id/edit                    | Edit user form handler                              |      |
| POST        | /users/:id/delete                  | Delete user                                         |      |
| GET         | /users/:id/dreamTeam               | User Dream Team (11 players according to formation) |      |
| GET         | /users/:id/dreamTeam/create        | New Dream Team form render                          |      |
| POST        | /users/:id/dreamTeam/create        | New Dream Team form handler                         |      |
| GET         | /users/:id/dreamTeam/edit          | Edit Dream Team form render                         |      |
| POST        | /users/:id/dreamTeam/edit          | Edit Dream Team form handler                        |      |
| POST        | /users/:id/dreamTeam/delete        | Delete Dream Team                                   |      |
| GET         | /users/:id/teams                   | User favorite teams list                            |      |
| GET         | /users/:id/leagues                 | User favorite leagues list                          |      |
| GET         | /users/:id/players                 | User favorite players list                          |      |
| GET         | /api/fixtures                      | Upcoming   soccer matches list                      | x    |
| GET         | /api/fixtures/{date}               | Results list                                        | x    |
| GET         | /api/teams                         | Teams list                                          | x    |
| GET         | /api/teams/{team_id}               | Specific team details                               | x    |
| GET         | /api/leagues                       | Leagues list                                        | x    |
| GET         | /api/leagues/{league_id}/standings | Specific league standings                           | x    |
| GET         | /api/players                       | Players list                                        | x    |
| GET         | /api/players/{player_id}           | Player details                                      | x    |