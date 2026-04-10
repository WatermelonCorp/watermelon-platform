import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { EditProfile } from './original';

const EditProfileDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [profile, setProfile] = useState({
    fullName: 'James Carter',
    email: 'jamescarter1930@gmail.com',
    timezone: 'GMT-8',
    workingHours: '10 AM – 6 PM',
    title: 'Project manager',
    avatarUrl:
      'https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?w=600&auto=format&fit=crop',
    lastUpdated: 'Dec 24, 2025',
  });

  const handleSave = (newData: any) => {
    setProfile(newData);
    setIsModalOpen(false);
  };

  return (
    <div
      className={`relative flex min-h-full w-full flex-col items-center justify-center overflow-hidden bg-transparent p-4 transition-colors duration-500`}
    >
      {/* View Display */}
      <div className="relative z-10 w-full max-w-sm rounded-[40px] border-[1.6px] border-gray-100 bg-white p-8 shadow-xl transition-all duration-500 sm:p-10 dark:border-[#2C2C2E] dark:bg-[#1C1C1E]">
        <div className="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full border-[6px] border-white shadow-xl ring-1 ring-gray-100/50 sm:h-28 sm:w-28 dark:border-[#2C2C2E] dark:ring-gray-700/30">
          <img
            src={profile.avatarUrl}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>

        <h1 className="mb-1 text-center text-[22px] font-extrabold tracking-tight text-[#111827] sm:text-[26px] dark:text-white">
          {profile.fullName}
        </h1>
        <p className="mb-8 text-center text-[14px] font-medium text-[#9CA3AF] sm:mb-10 sm:text-[16px] dark:text-[#A1A1A6]">
          {profile.title}
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-[#0F0F0F] py-4 text-[14px] font-bold text-white shadow-lg shadow-black/10 transition-all hover:bg-black active:scale-95 sm:text-[16px] dark:bg-white dark:text-black dark:shadow-white/5 dark:hover:bg-gray-200"
        >
          <Pencil size={18} strokeWidth={2.5} />
          Edit Profile
        </button>
      </div>

      {/* Modal Component */}
      <EditProfile
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={profile}
        onSave={handleSave}
      />
    </div>
  );
};

export default EditProfileDemo;
