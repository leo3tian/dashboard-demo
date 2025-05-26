// Uniform user type for the frontend
export type User = {
    name: string;
    created: string;
    passwordChanged: string;
    daysSincePasswordChange: number;
    lastAccess: string;
    daysSinceLastAccess: number;
    mfaEnabled: boolean;
};