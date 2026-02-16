import { supabase } from "@/lib/supabase";
import { ScrollText } from "lucide-react";

async function getAuditLogs() {
  const { data, error } = await supabase
    .from("AuditLog")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Error fetching audit logs:", error);
    return [];
  }
  return data;
}

export default async function AuditLogsPage() {
  const logs = await getAuditLogs();

  const actionColors: Record<string, string> = {
    CREATE: "bg-green-100 text-green-800",
    UPDATE: "bg-blue-100 text-blue-800",
    DELETE: "bg-red-100 text-red-800",
    BLOCK_IP: "bg-orange-100 text-orange-800",
    UNBLOCK_IP: "bg-teal-100 text-teal-800",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <ScrollText className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary">Audit Logs</h1>
          <p className="text-sm text-gray-500">
            Complete history of all administrative actions. ({logs.length}{" "}
            records)
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left p-4 font-semibold text-gray-600">
                  Timestamp
                </th>
                <th className="text-left p-4 font-semibold text-gray-600">
                  Action
                </th>
                <th className="text-left p-4 font-semibold text-gray-600">
                  Entity
                </th>
                <th className="text-left p-4 font-semibold text-gray-600">
                  Entity ID
                </th>
                <th className="text-left p-4 font-semibold text-gray-600">
                  IP Address
                </th>
                <th className="text-left p-4 font-semibold text-gray-600">
                  Details
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
                    No audit logs recorded yet.
                  </td>
                </tr>
              ) : (
                logs.map((log: any) => (
                  <tr
                    key={log.id}
                    className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-gray-600 whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          actionColors[log.action] ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-gray-800">
                      {log.entity}
                    </td>
                    <td className="p-4 text-gray-500 font-mono text-xs max-w-[120px] truncate">
                      {log.entityId}
                    </td>
                    <td className="p-4 text-gray-500 text-xs">
                      {log.ipAddress || "—"}
                    </td>
                    <td className="p-4 text-gray-500 text-xs max-w-[200px] truncate">
                      {log.details || "—"}
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
