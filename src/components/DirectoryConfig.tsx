
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DirectoryConfigProps {
  title: string;
  subtitle: string;
  type: "source" | "target";
}

const DirectoryConfig = ({ title, subtitle, type }: DirectoryConfigProps) => {
  return (
    <Card className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
      
      {type === "source" ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dbType">Database Type</Label>
            <Select defaultValue="internal">
              <SelectTrigger>
                <SelectValue placeholder="Select database type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="internal">Internal Database</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="retention">Data Retention (days)</Label>
            <Input 
              id="retention" 
              type="number"
              placeholder="365" 
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="backupFrequency">Backup Frequency</Label>
            <Select defaultValue="daily">
              <SelectTrigger>
                <SelectValue placeholder="Select backup frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">OpenLDAP Server URL</Label>
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
          
          <div className="space-y-2">
            <Label htmlFor="protocol">LDAP Protocol Version</Label>
            <Select defaultValue="3">
              <SelectTrigger>
                <SelectValue placeholder="Select LDAP version" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">Version 3</SelectItem>
                <SelectItem value="2">Version 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </Card>
  );
};

export default DirectoryConfig;
