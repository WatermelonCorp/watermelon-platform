import { Button } from '@/components/base-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/base-ui/card';
import { Input } from '@/components/base-ui/input';
import { Label } from '@/components/base-ui/label';

type FormField = {
  id: string;
  label: string;
  placeholder?: string;
  type: 'email' | 'password';
};

const fields: readonly FormField[] = [
  {
    id: 'work-email',
    label: 'Work email',
    placeholder: 'team@studio.com',
    type: 'email',
  },
  {
    id: 'access-code',
    label: 'Access code',
    type: 'password',
  },
] as const;

const Card1 = () => {
  return (
    <Card className="ring-0  bg-background/95 w-full max-w-md shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] ">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Sign in to your workspace</CardTitle>
        <CardDescription className="max-w-sm text-sm leading-6">
          Use your work details to continue to the project dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-5">
            {fields.map((field) => (
              <div key={field.id} className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor={field.id} className="text-sm font-medium">
                    {field.label}
                  </Label>
                  {field.id === 'access-code' ? (
                    <a
                      href="#"
                      className="text-muted-foreground ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Reset it
                    </a>
                  ) : null}
                </div>
                <Input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="border-border/70 h-11 focus-visible:ring-primary/20 focus-visible:border-primary/50"
                />
              </div>
            ))}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2.5 pt-3">
        <Button
          type="submit"
          className="h-11 w-full"
        >
          Continue
        </Button>
        <Button variant="outline" className="border-border/70 h-11 w-full">
          Sign in with email link
        </Button>
        <div className="text-muted-foreground mt-3 text-center text-sm">
          New here?{' '}
          <a href="#" className="text-foreground underline underline-offset-4">
            Request access
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Card1;
