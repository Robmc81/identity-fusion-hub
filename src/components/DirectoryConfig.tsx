
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DirectoryConfigProps {
  title: string;
  subtitle: string;
}

const DirectoryConfig = ({ title, subtitle }: DirectoryConfigProps) => {
  return (
    <Card className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url">LDAP URL</Label>
          <Input 
            id="url" 
            placeholder="ldap://your-server:389" 
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bindDn">Bind DN</Label>
          <Input 
            id="bindDn" 
            placeholder="cn=admin,dc=example,dc=com" 
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Bind Password</Label>
          <Input 
            id="password" 
            type="password" 
            placeholder="Enter bind password" 
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="baseDn">Base DN</Label>
          <Input 
            id="baseDn" 
            placeholder="dc=example,dc=com" 
            className="w-full"
          />
        </div>
      </div>
    </Card>
  );
};

export default DirectoryConfig;
