
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Loader2, Mail, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InternalUser } from "@/pages/Index";

interface Request {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  justification: string;
  status: "pending" | "approved" | "rejected" | "provisioning" | "provisioned";
  submittedAt: string;
}

interface AccountRequestProps {
  onProvision: (user: Omit<InternalUser, 'id' | 'created' | 'lastModified'>) => void;
}

const AccountRequest = ({ onProvision }: AccountRequestProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    justification: ""
  });

  // Sample requests data - in a real app, this would come from a backend
  const [requests, setRequests] = useState<Request[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create new request
    const newRequest: Request = {
      id: requests.length + 1,
      ...formData,
      status: "pending",
      submittedAt: new Date().toISOString().split('T')[0]
    };

    // Add to requests
    setRequests(prev => [...prev, newRequest]);
    
    setIsSubmitting(false);
    toast.success("Account request submitted successfully!");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      justification: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const provisionUser = async (request: Request) => {
    // Update request status to provisioning
    setRequests(prev => prev.map(r => 
      r.id === request.id ? { ...r, status: "provisioning" } : r
    ));

    // Create new internal directory user
    const newUser = {
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      department: request.department,
      title: "New Employee", // Default title
      employeeId: `EMP${String(request.id).padStart(3, '0')}`,
      status: "active" as const
    };

    // Simulate provisioning process
    toast.promise(
      new Promise<void>((resolve) => {
        setTimeout(() => {
          onProvision(newUser);
          resolve();
        }, 3000);
      }),
      {
        loading: 'Provisioning user in internal directory...',
        success: 'User successfully provisioned in internal directory',
        error: 'Failed to provision user'
      }
    );

    // After 3 seconds, update the status to provisioned
    setTimeout(() => {
      setRequests(prev => prev.map(r => 
        r.id === request.id ? { ...r, status: "provisioned" } : r
      ));
    }, 3000);
  };

  const handleApprove = async (id: number) => {
    const request = requests.find(r => r.id === id);
    if (!request) return;

    // First update status to approved
    setRequests(prev => prev.map(r => 
      r.id === id ? { ...r, status: "approved" } : r
    ));
    
    toast.success("Request approved successfully");
    
    // Then start provisioning process
    await provisionUser(request);
  };

  const handleReject = (id: number) => {
    setRequests(prev => prev.map(r => 
      r.id === id ? { ...r, status: "rejected" } : r
    ));
    toast.error("Request rejected");
  };

  const getStatusBadgeClass = (status: Request['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'provisioning':
        return 'bg-yellow-100 text-yellow-800';
      case 'provisioned':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="max-w-4xl mx-auto p-6">
      <Tabs defaultValue="submit" className="space-y-6">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="submit">Submit Request</TabsTrigger>
          <TabsTrigger value="view">View Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="submit">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">Request New Account</h2>
              <p className="text-sm text-gray-500">
                Fill out this form to request a new LDAP account. Your request will be reviewed by an administrator.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  name="department"
                  placeholder="Engineering"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="justification">Request Justification</Label>
                <Input
                  id="justification"
                  name="justification"
                  placeholder="Please explain why you need this account"
                  value={formData.justification}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 hover:bg-gray-800"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting Request...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Submit Account Request
                  </>
                )}
              </Button>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="view">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">Account Requests</h2>
              <p className="text-sm text-gray-500">
                Review and manage account requests
              </p>
            </div>

            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{`${request.firstName} ${request.lastName}`}</TableCell>
                      <TableCell>{request.email}</TableCell>
                      <TableCell>{request.department}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${getStatusBadgeClass(request.status)}`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{request.submittedAt}</TableCell>
                      <TableCell>
                        {request.status === 'pending' && (
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 hover:text-green-700"
                              onClick={() => handleApprove(request.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleReject(request.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AccountRequest;
