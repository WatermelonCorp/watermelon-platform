import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { EditProfile } from './index';

const EditProfileDemo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [profile, setProfile] = useState({
        fullName: "James Carter",
        email: "jamescarter1930@gmail.com",
        timezone: "GMT-8",
        workingHours: "10 AM – 6 PM",
        title: "Project manager",
        avatarUrl: "https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?w=600&auto=format&fit=crop",
        lastUpdated: "Dec 24, 2025"
    });

    const handleSave = (newData: any) => {
        setProfile(newData);
        setIsModalOpen(false);
    };

    return (
        <div className={`min-h-full w-full `}>
            
            <div className={`relative min-h-full w-full overflow-hidden flex flex-col items-center justify-center transition-colors duration-500 bg-transparent p-4`}>
                
                {/* View Display */}
                <div className="relative z-10 w-full max-w-sm p-8 sm:p-10 rounded-[40px] shadow-xl border-[1.6px] transition-all duration-500 
                    bg-white border-gray-100 
                    dark:bg-[#1C1C1E] dark:border-[#2C2C2E]">

                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-[6px] shadow-xl mb-6 ring-1 mx-auto
                        border-white ring-gray-100/50
                        dark:border-[#2C2C2E] dark:ring-gray-700/30">
                        <img
                            src={profile.avatarUrl}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <h1 className="text-[22px] sm:text-[26px] font-extrabold mb-1 tracking-tight text-center 
                        text-[#111827] dark:text-white">
                        {profile.fullName}
                    </h1>
                    <p className="text-[14px] sm:text-[16px] font-medium mb-8 sm:mb-10 text-center 
                        text-[#9CA3AF] dark:text-[#A1A1A6]">
                        {profile.title}
                    </p>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full py-4 rounded-full font-bold text-[14px] sm:text-[16px] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg
                        bg-[#0F0F0F] text-white hover:bg-black shadow-black/10
                        dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:shadow-white/5"
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
        </div>
    );
};

export default EditProfileDemo;