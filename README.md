# User Dashboard

A full-stack application that displays a list of users. 

## Structure

The frontend is organized to cleanly separate UI components (src/components), data fetching logic (src/assets), and shared types (src/types.ts), making the codebase easier to read, scale, and maintain.

The backend is organized so that server ops (main.go) are separated from data (), making it easier to switch from reading static data to possibly pulling from a database.

## Technical Choices

- End-to-end typing: One of the project constraints that I wanted to take advantage of is that both TypeScript (frontend) and Go (backend) are statically typed - this let me define a single User type, making data consistently structured across the system.
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

## 🛠️ Tech Stack

- **Frontend**: React.js, TypeScript, TailwindCSS, Vite
- **Backend**: Go (`net/http`)
- **Build Tools**: npm, Vite
