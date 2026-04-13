import { Label } from '@/components/base-ui/label';
import { Switch } from '@/components/base-ui/switch';

const Switch1 = () => {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="notifications" />
      <Label htmlFor="notifications">Enable Notifications</Label>
    </div>
  );
};

export default Switch1;
