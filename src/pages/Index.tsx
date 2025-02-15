
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2, ArrowLeftRight } from "lucide-react";
import DirectoryConfig from "@/components/DirectoryConfig";
import SyncPanel from "@/components/SyncPanel";
import { toast } from "sonner";

const Index = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate connection for demo
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      toast.success("Successfully connected to both LDAP directories");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <div className="inline-block px-4 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600 mb-2">
            LDAP Directory Sync
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            OpenLDAP Directory Synchronization
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Seamlessly synchronize users, groups, and attributes between two OpenLDAP directories
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <DirectoryConfig 
            title="Source Directory" 
            subtitle="Configure your source LDAP server"
          />
          <DirectoryConfig 
            title="Target Directory"
            subtitle="Configure your target LDAP server" 
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
                Connecting...
              </>
            ) : (
              <>
                <ArrowLeftRight className="mr-2 h-4 w-4" />
                Connect Directories
              </>
            )}
          </Button>
        </div>

        {isConnected && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SyncPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
