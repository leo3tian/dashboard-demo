package main

import (
	"encoding/json"
	"net/http"
	"os"
	"time"
)

// Reads user data from a JSON file and returns a slice of User structs
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

// Handles the /api/users endpoint and returns user data, adding on additional fields
// for days since password change and last access
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

// Calculates the number of days since a given date string in "Jan 2 2006" format
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
