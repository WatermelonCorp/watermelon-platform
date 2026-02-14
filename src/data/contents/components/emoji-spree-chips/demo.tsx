import { EmojiSpreeChips, type InterestItem } from './index';

const INTERESTS: InterestItem[] = [
    { id: '1', label: 'Design', emoji: '🎨' },
    { id: '2', label: 'Music', emoji: '🎵' },
    { id: '3', label: 'Gaming', emoji: '🎮' },
    { id: '4', label: 'Cooking', emoji: '🍳' },
    { id: '5', label: 'Travel', emoji: '✈️' },
    { id: '6', label: 'Crypto', emoji: '🪙' },
    { id: '7', label: 'Photography', emoji: '📸' },
    { id: '8', label: 'Coding', emoji: '💻' },
    { id: '9', label: 'Fitness', emoji: '🏋️' },
    { id: '10', label: 'Art', emoji: '🖼️' },
];

export default function EmojiSpreeChipsDemo() {
    const handleChange = (selectedIds: string[]) => {
        console.log('Selected interests:', selectedIds);
    };

    return (
        <div className="flex items-center justify-center ">
            <EmojiSpreeChips
                interests={INTERESTS}
                onChange={handleChange}
            />
        </div>
    );
}
