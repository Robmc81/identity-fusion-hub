import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InternalUser } from "@/pages/Index";

interface InternalDirectoryProps {
  users: InternalUser[];
}

const InternalDirectory = ({ users }: InternalDirectoryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<InternalUser | null>(null);

  const filteredUsers = users.filter(user => 
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-1">Internal Directory</h3>
          <p className="text-sm text-gray-500">
            {users.length} users in internal directory
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users..."
            className="pl-9 w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Employee ID</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Modified</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelectedUser(user)}>
                <TableCell>
                  <Dialog>
                    <DialogTrigger className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-blue-500" />
                      <div>
                        <div className="font-medium">{`${user.firstName} ${user.lastName}`}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>User Details</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <div>
                          <h4 className="font-medium mb-2">Personal Information</h4>
                          <dl className="space-y-2">
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                              <dd>{`${user.firstName} ${user.lastName}`}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Email</dt>
                              <dd>{user.email}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Employee ID</dt>
                              <dd>{user.employeeId}</dd>
                            </div>
                          </dl>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Employment Information</h4>
                          <dl className="space-y-2">
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Department</dt>
                              <dd>{user.department}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Title</dt>
                              <dd>{user.title}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Status</dt>
                              <dd>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                  ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                </span>
                              </dd>
                            </div>
                          </dl>
                        </div>
                        <div className="col-span-2">
                          <h4 className="font-medium mb-2">System Information</h4>
                          <dl className="space-y-2">
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Created</dt>
                              <dd>{new Date(user.created).toLocaleDateString()}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Last Modified</dt>
                              <dd>{new Date(user.lastModified).toLocaleDateString()}</dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>{user.employeeId}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>{user.title}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>{new Date(user.lastModified).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default InternalDirectory;
