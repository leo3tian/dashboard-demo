import { useEffect, useState } from "react";
import { getUsers } from "../api/getUsers";
import type { User } from "../types";
import ReloadStatus from "./ReloadStatus";

// Component to display user security dashboard. Includes a table, reload functionality,
// and the ability to filter users based on certain criteria.
export default function UserDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  // Initially fetches users when component mounts, and sets loading state
  useEffect(() => {
    doReload();
  }, []);

  // Reloads users and sets loading state to true
  const doReload = () => {
    setLoading(true);
    getUsers()
      .then(data => {
        setUsers(data);
        setUpdatedAt(new Date());
        setError(null);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  // Checks user warnings based on password change and last access dates
  const checkUserWarnings = (user: User): string[] => {
    const warnings: string[] = [];
  
    if (user.daysSincePasswordChange > 365) {
      warnings.push("Old password");
    }
  
    if (user.daysSinceLastAccess > 90) {
      warnings.push("Inactive");
    }
  
    return warnings;
  };
  

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">User Security Dashboard</h1>
      <ReloadStatus onReload={doReload} updatedAt={updatedAt} />
  
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      {loading && <p className="text-sm text-gray-400 mb-4">Loading...</p>}
  
      {!loading && (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Create Date</th>
                <th className="px-4 py-3 font-medium">Password Changed</th>
                <th className="px-4 py-3 font-medium">Days Since Password Change</th>
                <th className="px-4 py-3 font-medium">Last Access</th>
                <th className="px-4 py-3 font-medium">Days Since Last Access</th>
                <th className="px-4 py-3 font-medium">MFA</th>
                <th className="px-4 py-3 font-medium">Warnings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors duration-100 ${
                    checkUserWarnings(user).length > 0 ? "bg-red-100 hover:bg-red-200" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.created}</td>
                  <td className="px-4 py-2">{user.passwordChanged}</td>
                  <td className="px-4 py-2">{user.daysSincePasswordChange}</td>
                  <td className="px-4 py-2">{user.lastAccess}</td>
                  <td className="px-4 py-2">{user.daysSinceLastAccess}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                        user.mfaEnabled
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.mfaEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </td>
                  <td className="px-4 py-2 font-bold text-xs text-red-600">
                    {checkUserWarnings(user).join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
  
}
