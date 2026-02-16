import { supabase } from "@/lib/supabase";
import { Mail, Eye, Archive, Reply, Clock } from "lucide-react";
import Link from "next/link";

async function getContacts() {
  const { data, error } = await supabase
    .from("Contact")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
  return data;
}

export default async function ContactsPage() {
  const contacts = await getContacts();

  const statusColors: Record<string, string> = {
    NEW: "bg-blue-100 text-blue-800",
    READ: "bg-gray-100 text-gray-600",
    REPLIED: "bg-green-100 text-green-800",
    ARCHIVED: "bg-yellow-100 text-yellow-800",
  };

  const statusIcons: Record<string, any> = {
    NEW: Mail,
    READ: Eye,
    REPLIED: Reply,
    ARCHIVED: Archive,
  };

  const newCount = contacts.filter((c: any) => c.status === "NEW").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Contact Submissions
            </h1>
            <p className="text-sm text-gray-500">
              {newCount > 0
                ? `${newCount} new message${newCount > 1 ? "s" : ""} awaiting review`
                : "All messages reviewed"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left p-4 font-semibold text-gray-600">
                  Status
                </th>
                <th className="text-left p-4 font-semibold text-gray-600">
                  Name
                </th>
                <th className="text-left p-4 font-semibold text-gray-600">
                  Email
                </th>
                <th className="text-left p-4 font-semibold text-gray-600">
                  Subject
                </th>
                <th className="text-left p-4 font-semibold text-gray-600">
                  Message
                </th>
                <th className="text-left p-4 font-semibold text-gray-600">
                  Received
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-12 text-gray-400"
                  >
                    <Mail className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    No contact submissions yet.
                  </td>
                </tr>
              ) : (
                contacts.map((contact: any) => (
                  <tr
                    key={contact.id}
                    className={`border-b last:border-0 hover:bg-gray-50 transition-colors ${
                      contact.status === "NEW"
                        ? "bg-blue-50/30"
                        : ""
                    }`}
                  >
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          statusColors[contact.status] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {contact.status}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-gray-800">
                      {contact.name}
                    </td>
                    <td className="p-4 text-gray-600">
                      <a
                        href={`mailto:${contact.email}`}
                        className="hover:text-primary transition-colors"
                      >
                        {contact.email}
                      </a>
                    </td>
                    <td className="p-4 text-gray-700">
                      {contact.subject || "—"}
                    </td>
                    <td className="p-4 text-gray-500 text-xs max-w-[250px] truncate">
                      {contact.message}
                    </td>
                    <td className="p-4 text-gray-400 text-xs whitespace-nowrap">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {new Date(contact.createdAt).toLocaleString()}
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
