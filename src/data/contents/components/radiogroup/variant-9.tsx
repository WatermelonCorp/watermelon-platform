import { Label } from '@/components/base-ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/base-ui/radio-group';

const RadioGroup9 = () => {
  return (
    <RadioGroup defaultValue="warning" className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="warning"
          id="color-warning"
          className="border-amber-500 text-amber-500 focus-visible:ring-amber-500/20 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500 data-[state=checked]:text-white dark:border-amber-400 dark:text-amber-400 dark:data-[state=checked]:border-amber-400 dark:data-[state=checked]:bg-amber-400"
        />
        <Label htmlFor="color-warning">Warning</Label>
      </div>

      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="positive"
          id="color-positive"
          className="border-emerald-500 text-emerald-500 focus-visible:ring-emerald-500/20 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-white dark:border-emerald-400 dark:text-emerald-400 dark:data-[state=checked]:border-emerald-400 dark:data-[state=checked]:bg-emerald-400"
        />
        <Label htmlFor="color-positive">Positive</Label>
      </div>

      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="neutral"
          id="color-neutral"
          className="border-indigo-500 text-indigo-500 focus-visible:ring-indigo-500/20 data-[state=checked]:border-indigo-500 data-[state=checked]:bg-indigo-500 data-[state=checked]:text-white dark:border-indigo-400 dark:text-indigo-400 dark:data-[state=checked]:border-indigo-400 dark:data-[state=checked]:bg-indigo-400"
        />
        <Label htmlFor="color-neutral">Neutral</Label>
      </div>
    </RadioGroup>
  );
};

export default RadioGroup9;
