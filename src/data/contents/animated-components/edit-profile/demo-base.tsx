import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { EditProfile } from './base';

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
        <div className={`min-h-150 w-full flex items-center justify-center`}>
            
            <div className={`relative min-h-full w-full overflow-hidden flex flex-col items-center justify-center transition-colors duration-500 bg-transparent p-4 theme-injected font-sans`}>
                
                {/* View Display */}
                <div className="relative z-10 w-full max-w-sm p-6 sm:p-8 rounded-2xl shadow-lg border-2 transition-all duration-500 
                    bg-card border-border">

                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 shadow-lg mb-6 ring-1 mx-auto
                        border-background ring-border/30">
                        <img
                            src={profile.avatarUrl}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-extrabold mb-1 tracking-tight text-center 
                        text-foreground">
                        {profile.fullName}
                    </h1>
                    <p className="text-sm sm:text-base font-medium mb-6 sm:mb-8 text-center 
                        text-muted-foreground">
                        {profile.title}
                    </p>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full py-3 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg
                        bg-foreground text-background hover:bg-foreground/90"
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