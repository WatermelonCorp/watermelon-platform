import { TbFileAlert } from 'react-icons/tb';

import { Alert, AlertTitle } from '@/components/base-ui/alert';

const Alert5 = () => {
  return (
    <Alert className="flex items-stretch rounded-none p-0">
      <div className="bg-destructive/20 text-destructive border-destructive/20 flex items-center rounded-none border border-r p-2">
        <TbFileAlert className="size-4" />
      </div>
      <AlertTitle className="p-3">This file may harm your system!</AlertTitle>
    </Alert>
  );
};

export default Alert5;
