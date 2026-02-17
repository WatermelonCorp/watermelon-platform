import { FeatureTour, type TourStep } from '.';
import { Activity } from 'lucide-react';
import { FaCircleCheck, FaKey, FaUser } from 'react-icons/fa6';
import { IoFolderOpenSharp } from 'react-icons/io5';
import { ImSearch } from 'react-icons/im';
import { BsFillEyeFill } from 'react-icons/bs';


export default function FeatureTourDemo() {
  const handleClose = () => {
    console.log("Tour closed");
    alert("Tour component would unmount now.");
  };

  const handleLearnMore = (step: TourStep) => {
    console.log("Learning more about:", step.title);
    alert(`Redirecting to documentation for: ${step.title}`);
  };

  const demoSteps: TourStep[] = [
    {
      id: 'passphrase',
      title: 'Passphrase Login',
      description: 'Secure access with a simple, memorable passphrase',
      icon: (
        <div className="relative">
          <div className="w-32 h-32 bg-[#FEFEFE] shadow-xl border border-gray-100 rounded-full flex items-center justify-center">
            <FaUser size={56} className="text-[#767881]" />
          </div>
          <div className="absolute top-3 -right-4 rounded-full p-2 ">
            <FaKey size={42} className="text-[#CECDD9] transform" />
          </div>
        </div>
      )
    },
    {
      id: 'offline',
      title: 'Offline Access',
      description: 'Access and edit your files without an internet connection.',
      icon: (
        <div className="relative">
          <IoFolderOpenSharp size={96} className="text-[#767881]" />
          <div className="absolute -top-2 -right-2 bg-white rounded-full shadow-xl p-1  ring-4 ring-gray-50/50">
            <FaCircleCheck size={40} className="text-white fill-[#C2C2CA]" />
          </div>
        </div>
      )
    },
    {
      id: 'search',
      title: 'Smart Search',
      description: 'Files are automatically organised for easy search and access.',
      icon: (
        <div className="relative">
          <div className="w-[104px] h-28 bg-[#FEFEFE] shadow-xl border-[1.4px] border-[#F0EFF6] rounded-2xl flex flex-col p-4 gap-2">
            <div className="h-2 w-full bg-gray-400 rounded-full opacity-50" />
            <div className="h-2 w-2/3 bg-gray-400 rounded-full opacity-50" />
            <div className="h-2 w-full bg-gray-400 rounded-full opacity-50" />
          </div>
          <div className="absolute -top-1 -right-5 bg-white rounded-full p-2 shadow-lg ring-4 ring-gray-50/80">
            <ImSearch size={36} className="text-[#C2C2CA]" />
          </div>
        </div>
      )
    },
    {
      id: 'monitoring',
      title: 'Activity Monitoring',
      description: 'Track file activity and changes for full transparency',
      icon: (
        <div className="relative">
          <div className="w-24 h-24 bg-[#B4B5BE] shadow-xl rounded-3xl flex items-center justify-center p-4">
             <Activity size={60} className="text-white opacity-80" />
          </div>
          <div className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-xl ring-8 ring-gray-50/30">
            <BsFillEyeFill size={40} className="text-[#C9C9D0]" />
          </div>
        </div>
      )
    }
  ];

  return (
        <FeatureTour 
        steps={demoSteps} 
        onClose={handleClose} 
        onLearnMore={handleLearnMore}
      />
  );
};