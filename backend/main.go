package main

import (
	"encoding/json"
	"net/http"
	"os"
	"time"
)

type User struct {
	Name                    string `json:"name"`
	CreateDate              string `json:"created"`
	PasswordChangedDate     string `json:"passwordChanged"`
	DaysSincePasswordChange int    `json:"daysSincePasswordChange"`
	LastAccessDate          string `json:"lastAccess"`
	DaysSinceLastAccess     int    `json:"daysSinceLastAccess"`
	MFAEnabled              bool   `json:"mfaEnabled"`
}

func loadUsersFromFile(path string) ([]User, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var users []User
	if err := json.Unmarshal(data, &users); err != nil {
		return nil, err
	}
	return users, nil
}

func usersHandler(w http.ResponseWriter, r *http.Request) {
	users, err := loadUsersFromFile("data/users.json")
	if err != nil {
		http.Error(w, "Failed to load users", http.StatusInternalServerError)
		return
	}

	for i := range users {
		users[i].DaysSincePasswordChange = daysSince(users[i].PasswordChangedDate)
		users[i].DaysSinceLastAccess = daysSince(users[i].LastAccessDate)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

func daysSince(dateStr string) int {
	parsed, err := time.Parse("Jan 2 2006", dateStr)
	if err != nil {
		return -1
	}
	return int(time.Since(parsed).Hours() / 24)
}

func main() {
	http.HandleFunc("/api/users", usersHandler)
	http.ListenAndServe(":8080", nil)
}
