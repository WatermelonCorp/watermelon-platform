import { OnboardingChecklist } from './index';

const DEMO_STEPS = [
    { id: 1, title: "Create your profile", isCompleted: true },
    { id: 2, title: "Add your first campaign", isCompleted: true },
    { id: 3, title: "Set budget & rules", isCompleted: false },
    { id: 4, title: "Invite creators", isCompleted: false },
    { id: 5, title: "Review submissions & approve", isCompleted: false },
];

export default function OnboardingChecklistDemo() {
    return (
            <OnboardingChecklist steps={DEMO_STEPS} />
    );
}