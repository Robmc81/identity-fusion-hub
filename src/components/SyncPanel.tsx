
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
import { Loader2, RefreshCcw, Users, UserPlus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface UserAttribute {
  name: string;
  type: "string" | "date" | "array" | "boolean";
  category: "personal" | "work" | "system" | "security";
  required: boolean;
}

interface DirectoryUser {
  id: string;
  attributes: {
    // Personal Information
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    secondaryEmail?: string;
    dateOfBirth?: string;
    gender?: string;
    nationality?: string;
    maritalStatus?: string;
    
    // Contact Information
    phoneNumber?: string;
    mobileNumber?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    
    // Work Information
    employeeId: string;
    title: string;
    department: string;
    division?: string;
    manager?: string;
    location?: string;
    startDate: string;
    endDate?: string;
    status: "active" | "inactive" | "onLeave" | "terminated";
    
    // Organizational
    costCenter?: string;
    companyCode?: string;
    businessUnit?: string;
    workSchedule?: string;
    office?: string;
    
    // System & Security
    username: string;
    accountStatus: "enabled" | "disabled" | "locked";
    passwordLastChanged?: string;
    lastLogin?: string;
    memberOf: string[];
    accessLevel: string;
    
    // Compliance & HR
    certifications?: string[];
    clearanceLevel?: string;
    emergencyContact?: string;
    visaStatus?: string;
    taxId?: string;
    
    // Custom Fields
    customAttributes?: Record<string, string>;
  };
}

const SyncPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users] = useState<DirectoryUser[]>([
    {
      id: "1",
      attributes: {
        firstName: "John",
        lastName: "Doe",
        displayName: "John Doe",
        email: "john.doe@example.com",
        employeeId: "EMP001",
        title: "Senior Software Engineer",
        department: "Engineering",
        startDate: "2023-01-15",
        status: "active",
        username: "john.doe",
        accountStatus: "enabled",
        memberOf: ["engineers", "project-alpha"],
        accessLevel: "standard"
      }
    },
    {
      id: "2",
      attributes: {
        firstName: "Jane",
        lastName: "Smith",
        displayName: "Jane Smith",
        email: "jane.smith@example.com",
        employeeId: "EMP002",
        title: "HR Manager",
        department: "Human Resources",
        startDate: "2022-06-01",
        status: "active",
        username: "jane.smith",
        accountStatus: "enabled",
        memberOf: ["hr-team", "management"],
        accessLevel: "admin"
      }
    }
  ]);

  const handleSync = async () => {
    setIsLoading(true);
    // Simulate sync process
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Directory synchronization completed successfully");
    }, 2000);
  };

  const filteredUsers = users.filter(user => 
    user.attributes.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.attributes.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.attributes.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-1">Directory Users</h3>
          <p className="text-sm text-gray-500">
            {users.length} users in directory
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              className="pl-9 w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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
              <TableHead>Name</TableHead>
              <TableHead>Employee ID</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Access Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center">
                    <UserPlus className="h-4 w-4 mr-2 text-blue-500" />
                    <div>
                      <div className="font-medium">{user.attributes.displayName}</div>
                      <div className="text-sm text-gray-500">{user.attributes.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.attributes.employeeId}</TableCell>
                <TableCell>{user.attributes.department}</TableCell>
                <TableCell>{user.attributes.title}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${user.attributes.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : user.attributes.status === 'inactive'
                      ? 'bg-gray-100 text-gray-800'
                      : user.attributes.status === 'onLeave'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                    }`}>
                    {user.attributes.status.charAt(0).toUpperCase() + user.attributes.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${user.attributes.accessLevel === 'admin' 
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                    }`}>
                    {user.attributes.accessLevel}
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
