package main

type User struct {
	Name                    string `json:"name"`
	CreateDate              string `json:"created"`
	PasswordChangedDate     string `json:"passwordChanged"`
	DaysSincePasswordChange int    `json:"daysSincePasswordChange"`
	LastAccessDate          string `json:"lastAccess"`
	DaysSinceLastAccess     int    `json:"daysSinceLastAccess"`
	MFAEnabled              bool   `json:"mfaEnabled"`
}
