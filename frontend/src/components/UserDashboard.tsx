import { useEffect, useState } from "react";
import { getUsers } from "../api/getUsers";
import type { User } from "../types";
import ReloadStatus from "./ReloadStatus";

export default function UserDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  // Initial fetch
  useEffect(() => {
    getUsers()
      .then(data => {
        setUsers(data);
        setUpdatedAt(new Date());
        setError(null);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Manual reload handler
  const doReloadClick = () => {
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

  return (
    <div className="p-4">
      <ReloadStatus onReload={doReloadClick} updatedAt={updatedAt} />

      {error && <p className="text-red-500 mb-2">Error: {error}</p>}
      {loading && <p className="text-sm text-gray-400 mb-2">Loading...</p>}

      {!loading && (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Create Date</th>
              <th className="border px-4 py-2">Password Changed</th>
              <th className="border px-4 py-2">Days Since Password Change</th>
              <th className="border px-4 py-2">Last Access</th>
              <th className="border px-4 py-2">Days Since Last Access</th>
              <th className="border px-4 py-2">MFA</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} className="text-center">
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.created}</td>
                <td className="border px-4 py-2">{user.passwordChanged}</td>
                <td className="border px-4 py-2">{user.daysSincePasswordChange}</td>
                <td className="border px-4 py-2">{user.lastAccess}</td>
                <td className="border px-4 py-2">{user.daysSinceLastAccess}</td>
                <td className="border px-4 py-2">{user.mfaEnabled ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
