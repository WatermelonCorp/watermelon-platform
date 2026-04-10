import { FcGoogle } from 'react-icons/fc';
import { FaXTwitter, FaGithub, FaFacebook } from 'react-icons/fa6';

import { Button } from '@/components/base-ui/button';

const Button22 = () => {
  return (
    <div className="flex w-full max-w-56 flex-col justify-center gap-4">
      <Button
        variant="outline"
        className="flex items-center gap-2 !border-red-500 bg-red-600/5 !text-red-600"
      >
        <FcGoogle className="size-5" />
        <span className="flex flex-1 justify-center">Continue with Google</span>
      </Button>

      <Button
        variant="outline"
        className="flex items-center gap-2 border-black bg-black/5 text-black dark:border-white dark:text-white"
      >
        <FaXTwitter className="size-5" />
        <span className="flex flex-1 justify-center">Continue with X</span>
      </Button>

      <Button
        variant="outline"
        className="flex items-center gap-2 !border-blue-600 bg-blue-600/5 !text-blue-600"
      >
        <FaFacebook className="size-5 text-[#0866fe]" />
        <span className="flex flex-1 justify-center">
          Continue with Facebook
        </span>
      </Button>

      <Button
        variant="outline"
        className="flex items-center gap-2 border-black bg-black/5 text-black dark:border-white dark:text-white"
      >
        <FaGithub className="size-5" />
        <span className="flex flex-1 justify-center">Continue with GitHub</span>
      </Button>
    </div>
  );
};

export default Button22;
