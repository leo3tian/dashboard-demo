package main

import (
	"encoding/json"
	"net/http"
	"time"
)

type User struct {
	Name                   string `json:"name"`
	CreateDate             string `json:"created"`
	PasswordChangedDate    string `json:"passwordChanged"`
	DaysSincePasswordChange int    `json:"daysSincePasswordChange"`
	LastAccessDate         string `json:"lastAccess"`
	DaysSinceLastAccess    int    `json:"daysSinceLastAccess"`
	MFAEnabled             bool   `json:"mfaEnabled"`
}

func daysSince(dateStr string) int {
	parsed, err := time.Parse("Jan 2 2006", dateStr)
	if err != nil {
		return -1 // or handle error
	}
	return int(time.Since(parsed).Hours() / 24)
}

func usersHandler(w http.ResponseWriter, r *http.Request) {
	users := []User{
		{
			Name:                "Foo Bar1",
			CreateDate:          "Oct 1 2020",
			PasswordChangedDate: "Oct 1 2021",
			LastAccessDate:      "Jan 4 2025",
			MFAEnabled:          true,
		},
		{
			Name:                "Foo1 Bar1",
			CreateDate:          "Sep 20 2019",
			PasswordChangedDate: "Sep 22 2019",
			LastAccessDate:      "Feb 8 2025",
			MFAEnabled:          false,
		},
		// Add more if needed
	}

	today := time.Now()

	for i := range users {
		users[i].DaysSincePasswordChange = int(today.Sub(parse(users[i].PasswordChangedDate)).Hours() / 24)
		users[i].DaysSinceLastAccess = int(today.Sub(parse(users[i].LastAccessDate)).Hours() / 24)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

func parse(dateStr string) time.Time {
	t, _ := time.Parse("Jan 2 2006", dateStr)
	return t
}

func main() {
	http.HandleFunc("/api/users", usersHandler)
	http.ListenAndServe(":8080", nil)
}
