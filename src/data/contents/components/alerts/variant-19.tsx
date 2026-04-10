import {
  Alert,
  AlertTitle,
  AlertDescription,
} from '@/components/base-ui/alert';
import { FaCheckCircle } from 'react-icons/fa';
const Alert19 = () => {
  return (
    <Alert className="border-green-600 bg-green-600/10 text-green-600 dark:border-green-400 dark:bg-green-400/10 dark:text-green-400">
      <FaCheckCircle />
      <AlertTitle>Order placed successfully</AlertTitle>
      <AlertDescription className="text-green-600/80 dark:text-green-400/80">
        Your order has been confirmed and is being processed.
      </AlertDescription>
    </Alert>
  );
};

export default Alert19;
