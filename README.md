# User Dashboard

A full-stack application that displays a list of users, intended for administrators to view users at-a-glance and quickly identify users who are inactive or have security concerns.

Highlights users who:
- Haven't changed their password in over a year
- Haven't accessed their account in over 90 days

## Steps to Run

1. Clone the repo (https://github.com/leo3tian/dashboard-demo)

2. Run backend at http://localhost:8080
```bash
cd backend
go run main.go
```
You can verify the backend is working by checking the /api/users endpoint here: http://localhost:8080/api/users

3. Run the frontend using vite
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
This will start the dev server at http://localhost:5173

4. Visit the app at http://localhost:5173

## Structure

The project is separated into a backend that provides user data, and a frontend that organizes that user data into a dashboard. 

The frontend is organized to cleanly separate UI components (src/components), data fetching logic (src/assets), and the user type (src/types.ts), making the codebase easier to read, scale, and maintain.

The backend is organized so that server logic (main.go) is separated from the user type (user.go). Data is stored in its own json file (data/users.json), making it easier to switch from reading static data to eventually pulling from a database.

## Technical Choices

- End-to-end typing: One of the project constraints that I wanted to take advantage of is that both TypeScript (frontend) and Go (backend) are statically typed - this let me define a single User type, making data consistently structured across the stack.
```ts
export type User = {
  name: string;
  created: string;
  passwordChanged: string;
  daysSincePasswordChange: number;
  lastAccess: string;
  daysSinceLastAccess: number;
  mfaEnabled: boolean;
};
```

```go
type User struct {
  Name                   string `json:"name"`
  CreateDate             string `json:"created"`
  PasswordChangedDate    string `json:"passwordChanged"`
  DaysSincePasswordChange int    `json:"daysSincePasswordChange"`
  LastAccessDate         string `json:"lastAccess"`
  DaysSinceLastAccess    int    `json:"daysSinceLastAccess"`
  MFAEnabled             bool   `json:"mfaEnabled"`
}
```

- Live timestamp display: To make sure the client knows how recent their data is, the dashboard shows when the data was last updated and includes a manual reload button that refreshes the table. 

- User warnings: Users that fit a predetermined critera are highlighted and their warnings are labelled (e.g. old password, inactivity). This lets admins quickly find out which users are at risk. I made these warnings as modular as possible by putting warning-labelling logic in its own method, so that in the future we can create custom warnings or change warming requirements.


