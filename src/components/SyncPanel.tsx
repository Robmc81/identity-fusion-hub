
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Loader2, RefreshCcw, Users, UserPlus } from "lucide-react";
import { toast } from "sonner";

const SyncPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [entries] = useState([
    { 
      dn: "cn=john.doe,ou=users,dc=example,dc=com",
      type: "user",
      status: "Not Synced",
      attributes: "cn, mail, uid" 
    },
    { 
      dn: "cn=developers,ou=groups,dc=example,dc=com",
      type: "group",
      status: "Not Synced",
      attributes: "cn, member" 
    },
    { 
      dn: "cn=jane.smith,ou=users,dc=example,dc=com",
      type: "user",
      status: "Not Synced",
      attributes: "cn, mail, uid" 
    },
  ]);

  const handleSync = async () => {
    setIsLoading(true);
    // Simulate sync process
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Directory synchronization completed successfully");
    }, 2000);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-1">Directory Entries</h3>
          <p className="text-sm text-gray-500">
            {entries.length} entries found in source directory
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => toast.success("Refreshed directory entries")}
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button
            onClick={handleSync}
            disabled={isLoading}
            className="bg-gray-900 hover:bg-gray-800"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <Users className="mr-2 h-4 w-4" />
                Sync All
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Distinguished Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Attributes</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow key={index}>
                <TableCell className="font-mono text-sm">{entry.dn}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {entry.type === 'user' ? (
                      <UserPlus className="h-4 w-4 mr-2 text-blue-500" />
                    ) : (
                      <Users className="h-4 w-4 mr-2 text-green-500" />
                    )}
                    {entry.type}
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{entry.attributes}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {entry.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default SyncPanel;
