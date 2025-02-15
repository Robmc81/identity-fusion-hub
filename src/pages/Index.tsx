
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Loader2, ArrowLeftRight } from "lucide-react";
import DirectoryConfig from "@/components/DirectoryConfig";
import SyncPanel from "@/components/SyncPanel";
import AccountRequest from "@/components/AccountRequest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import InternalDirectory from "@/components/InternalDirectory";

export interface InternalUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  title: string;
  employeeId: string;
  status: "active" | "inactive";
  created: string;
  lastModified: string;
}

const INITIAL_USER = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  department: "Engineering",
  title: "Senior Software Engineer",
  employeeId: "EMP001",
  status: "active" as const,
  created: "2024-01-15",
  lastModified: "2024-02-20"
};

const Index = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [users, setUsers] = useState<InternalUser[]>(() => {
    const savedUsers = localStorage.getItem('internalUsers');
    return savedUsers ? JSON.parse(savedUsers) : [INITIAL_USER];
  });

  useEffect(() => {
    localStorage.setItem('internalUsers', JSON.stringify(users));
  }, [users]);

  const handleConnect = async () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      toast.success("Successfully connected to OpenLDAP server");
    }, 2000);
  };

  const addUserToDirectory = (user: Omit<InternalUser, 'id' | 'created' | 'lastModified'>) => {
    const newUser: InternalUser = {
      ...user,
      id: `${users.length + 1}`,
      created: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    setUsers(prev => [...prev, newUser]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <div className="inline-block px-4 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600 mb-2">
            LDAP Management System
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Directory Management & Account Requests
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Manage internal user directory and synchronize with OpenLDAP
          </p>
        </header>

        <Tabs defaultValue="directory" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="directory">Directory</TabsTrigger>
            <TabsTrigger value="sync">Sync</TabsTrigger>
            <TabsTrigger value="request">Request Account</TabsTrigger>
          </TabsList>

          <TabsContent value="directory">
            <InternalDirectory users={users} />
          </TabsContent>

          <TabsContent value="sync" className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <DirectoryConfig 
                title="Internal Directory" 
                subtitle="Configure your internal user database"
                type="source"
              />
              <DirectoryConfig 
                title="OpenLDAP Server"
                subtitle="Configure your target OpenLDAP server" 
                type="target"
              />
            </div>

            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleConnect}
                disabled={isConnecting}
                className="relative px-8 py-2 bg-gray-900 hover:bg-gray-800 text-white transition-all duration-200"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting to OpenLDAP...
                  </>
                ) : (
                  <>
                    <ArrowLeftRight className="mr-2 h-4 w-4" />
                    Connect to OpenLDAP
                  </>
                )}
              </Button>
            </div>

            {isConnected && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <SyncPanel />
              </div>
            )}
          </TabsContent>

          <TabsContent value="request">
            <AccountRequest onProvision={addUserToDirectory} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
