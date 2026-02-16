import { supabase } from "@/lib/supabase";
import { MapPin } from "lucide-react";

async function getLoginLogs() {
  const { data, error } = await supabase
    .from("LoginLog")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Error fetching login logs:", error);
    return [];
  }
  return data;
}

export default async function LoginLogsPage() {
  const logs = await getLoginLogs();

  const statusColors: Record<string, string> = {
    SUCCESS: "bg-green-100 text-green-800",
    FAILED: "bg-yellow-100 text-yellow-800",
    BLOCKED: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <MapPin className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary">
            Login History
          </h1>
          <p className="text-sm text-gray-500">
            Track all login attempts with geographic location data. (
            {logs.length} records)
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-2xl font-bold text-green-700">
            {logs.filter((l: any) => l.status === "SUCCESS").length}
          </p>
          <p className="text-xs text-green-600 uppercase tracking-wider">
            Successful Logins
          </p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-2xl font-bold text-yellow-700">
            {logs.filter((l: any) => l.status === "FAILED").length}
          </p>
          <p className="text-xs text-yellow-600 uppercase tracking-wider">
            Failed Attempts
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-2xl font-bold text-red-700">
            {logs.filter((l: any) => l.status === "BLOCKED").length}
          </p>
          <p className="text-xs text-red-600 uppercase tracking-wider">
            Blocked Attempts
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left p-4 font-semibold text-gray-600">
                  Time
                </th>
                <th className="text-left p-4 font-semibold text-gray-600">
                  Email
                </th>
                <th className="text-left p-4 font-semibold text-gray-600">
                  Status
                </th>
                <th className="text-left p-4 font-semibold text-gray-600">
                  IP Address
                </th>
                <th className="text-left p-4 font-semibold text-gray-600">
                  Location
                </th>
                <th className="text-left p-4 font-semibold text-gray-600">
                  Reason
                </th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-12 text-gray-400"
                  >
                    No login activity recorded yet.
                  </td>
                </tr>
              ) : (
                logs.map((log: any) => (
                  <tr
                    key={log.id}
                    className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-gray-600 whitespace-nowrap text-xs">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="p-4 font-medium text-gray-800">
                      {log.email}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          statusColors[log.status] ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 font-mono text-xs">
                      {log.ipAddress || "—"}
                    </td>
                    <td className="p-4 text-gray-600 text-xs">
                      <div className="flex items-center gap-1">
                        {log.city || log.country ? (
                          <>
                            <MapPin className="w-3 h-3 text-gray-400" />
                            {[log.city, log.region, log.country]
                              .filter(Boolean)
                              .join(", ")}
                          </>
                        ) : (
                          "—"
                        )}
                      </div>
                      {log.latitude && log.longitude && (
                        <span className="text-[10px] text-gray-400">
                          {log.latitude.toFixed(2)}°,{" "}
                          {log.longitude.toFixed(2)}°
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-xs text-red-500">
                      {log.failReason || "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
