import { useEffect, useState } from 'react';

type ReloadStatusProps = {
  onReload: () => void;
  updatedAt: Date | null;
};

// Component to display reload status and last update time
// Takes in a callback for reloading data (() => void) and the last updated time (Date | null)
export default function ReloadStatus({ onReload, updatedAt }: ReloadStatusProps) {
  const [now, setNow] = useState(new Date());

  // Updates the current time every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(interval);
  }, []);

  // Helper function to format time since last update
  function timeSince(date: Date): string {
    const seconds = Math.ceil((now.getTime() - date.getTime()) / 1000);
    if (seconds < 60) return "< 1 minute ago";
    return Math.floor(seconds / 60) + " minutes ago";
  }

  return (
    <div className="mb-2 flex items-center gap-4 text-sm text-gray-500">
      <button
        onClick={onReload}
        className="px-3 py-1 rounded bg-gray-100 border border-gray-300 hover:bg-gray-200 transition"
      >
        Reload
      </button>
      {updatedAt && <span>Updated {timeSince(updatedAt)}</span>}
    </div>
  );
}
