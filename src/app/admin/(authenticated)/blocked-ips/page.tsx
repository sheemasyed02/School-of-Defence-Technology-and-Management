"use client";

import { useEffect, useState } from "react";
import { Ban, Shield, Plus, X, UserX, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { blockIPAction, unblockIPAction } from "@/app/actions";
import { useRouter } from "next/navigation";

interface BlockedIP {
  id: string;
  ipAddress: string;
  reason: string;
  blockedAt: string;
  expiresAt: string | null;
  isActive: boolean;
}

interface BlockedUser {
  key: string;
  count: number;
  windowStart: string;
  expiresAt: string;
  email: string;
}

export default function SecurityPage() {
  const router = useRouter();
  const [blockedIPs, setBlockedIPs] = useState<BlockedIP[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formIP, setFormIP] = useState("");
  const [formReason, setFormReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [ipsRes, usersRes] = await Promise.all([
        fetch("/api/admin/blocked-ips"),
        fetch("/api/admin/rate-limits"),
      ]);
      const ips = await ipsRes.json();
      const users = await usersRes.json();
      setBlockedIPs(Array.isArray(ips) ? ips : []);
      setBlockedUsers(Array.isArray(users) ? users : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleBlock() {
    if (!formIP || !formReason) return;
    setSubmitting(true);
    const result = await blockIPAction(formIP, formReason);
    if (result.success) {
      setFormIP("");
      setFormReason("");
      setShowForm(false);
      await fetchData();
      router.refresh();
    } else {
      alert(result.error);
    }
    setSubmitting(false);
  }

  async function handleUnblockIP(id: string) {
    if (!confirm("Are you sure you want to unblock this IP?")) return;
    const result = await unblockIPAction(id);
    if (result.success) {
      await fetchData();
      router.refresh();
    } else {
      alert(result.error);
    }
  }

  async function handleUnblockUser(key: string) {
      if (!confirm("Are you sure you want to unblock this user? This will reset their login attempts.")) return;
      try {
          const res = await fetch(`/api/admin/rate-limits?key=${encodeURIComponent(key)}`, {
              method: "DELETE"
          });
          if (res.ok) {
              await fetchData();
              router.refresh();
          } else {
              alert("Failed to unblock user");
          }
      } catch (e) {
          console.error(e);
          alert("Error unblocking user");
      }
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-600/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Security Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Manage blocked IPs and rate-limited users.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
            <Button
            onClick={() => fetchData()}
            variant="outline"
            className="border-gray-300"
            >
            Refresh
            </Button>
            <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-red-600 hover:bg-red-700 text-white"
            >
            <Plus className="w-4 h-4 mr-1" />
            Block IP
            </Button>
        </div>
      </div>

      {/* Block IP Form */}
      {showForm && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-red-800">Manually Block IP</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                IP Address
              </label>
              <Input
                placeholder="192.168.1.100"
                value={formIP}
                onChange={(e) => setFormIP(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Reason
              </label>
              <Input
                placeholder="Suspicious activity..."
                value={formReason}
                onChange={(e) => setFormReason(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleBlock}
              disabled={submitting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {submitting ? "Blocking..." : "Confirm Block"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Blocked Users Section */}
      <section>
          <div className="flex items-center gap-2 mb-4">
              <UserX className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-bold">Temporarily Blocked Users</h2>
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                  Failed Logins
              </span>
          </div>

          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                <tr className="bg-gray-50 border-b">
                    <th className="text-left p-4 font-semibold text-gray-600">Email (User)</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Failures</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Expires At</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Actions</th>
                </tr>
                </thead>
                <tbody>
                {loading ? (
                    <tr><td colSpan={4} className="p-8 text-center text-gray-400">Loading...</td></tr>
                ) : blockedUsers.length === 0 ? (
                    <tr><td colSpan={4} className="p-8 text-center text-gray-400 italic">No users currently blocked by rate limiting.</td></tr>
                ) : (
                    blockedUsers.map((user) => (
                    <tr key={user.key} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="p-4 font-medium">{user.email || user.key}</td>
                        <td className="p-4">
                            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">
                                {user.count} / 5
                            </span>
                        </td>
                        <td className="p-4 text-gray-500 text-xs">
                            {new Date(user.expiresAt).toLocaleString()}
                        </td>
                        <td className="p-4">
                            <Button
                                size="sm"
                                variant="outline"
                                className="text-green-600 border-green-200 hover:bg-green-50"
                                onClick={() => handleUnblockUser(user.key)}
                            >
                                <Shield className="w-3 h-3 mr-1" /> Unblock
                            </Button>
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
            </table>
            </div>
          </div>
      </section>

      {/* Blocked IPs Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
            <Ban className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-bold">Blocked IP Addresses</h2>
        </div>

        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                <tr className="bg-gray-50 border-b">
                    <th className="text-left p-4 font-semibold text-gray-600">IP Address</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Reason</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Blocked At</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Expires</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Status</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Actions</th>
                </tr>
                </thead>
                <tbody>
                {loading ? (
                    <tr><td colSpan={6} className="p-8 text-center text-gray-400">Loading...</td></tr>
                ) : blockedIPs.length === 0 ? (
                    <tr><td colSpan={6} className="p-8 text-center text-gray-400 italic">No blocked IPs found.</td></tr>
                ) : (
                    blockedIPs.map((ip) => (
                    <tr key={ip.id} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="p-4 font-mono font-medium">{ip.ipAddress}</td>
                        <td className="p-4 text-xs text-gray-600 max-w-[200px] truncate" title={ip.reason}>{ip.reason}</td>
                        <td className="p-4 text-xs text-gray-500 whitespace-nowrap">{new Date(ip.blockedAt).toLocaleString()}</td>
                        <td className="p-4 text-xs text-gray-500 whitespace-nowrap">{ip.expiresAt ? new Date(ip.expiresAt).toLocaleString() : "Permanent"}</td>
                        <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${ip.isActive ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-600"}`}>
                                {ip.isActive ? "Active" : "Expired"}
                            </span>
                        </td>
                        <td className="p-4">
                            {ip.isActive && (
                                <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleUnblockIP(ip.id)}
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                >
                                <X className="w-3 h-3 mr-1" />
                                Unblock
                                </Button>
                            )}
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
            </table>
            </div>
        </div>
      </section>
    </div>
  );
}
