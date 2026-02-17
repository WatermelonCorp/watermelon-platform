"use client";

import { OnboardingScreen } from './index';

export default function OnboardingDemo() {
    const handleOnboardingComplete = (data: any) => {
        console.log("Onboarding Data Captured:", data);
    };

    return (
        <div className="w-full">
            <OnboardingScreen 
                title="Create Workspace"
                subtitle="Setting up your private workspace for collaboration."
                businessNameLabel="Workspace Name"
                businessNamePlaceholder="e.g. Design Team"
                legalNameLabel="Company Entity"
                legalNamePlaceholder="e.g. Design Lab LLC"
                nextButtonText="Continue Setup"
                finishButtonText="Launch App"
                tooltipMainText="Upload workspace logo"
                rightSectionDescription="This information will be used to customize your dashboard experience and team collaboration settings."
                onComplete={handleOnboardingComplete} 
            />
        </div>
    );
}