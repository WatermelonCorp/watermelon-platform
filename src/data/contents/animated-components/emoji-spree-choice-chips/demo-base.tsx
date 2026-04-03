import { EmojiSpreeChips, type InterestItem } from './base';

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
    { id: '11', label: 'Movies', emoji: '🎬' },
    { id: '12', label: 'Reading', emoji: '📚' },
    { id: '13', label: 'Nature', emoji: '🌿' },
    { id: '14', label: 'Coffee', emoji: '☕' },
    { id: '15', label: 'Sports', emoji: '🏀' },
    { id: '16', label: 'Fashion', emoji: '👗' },
    { id: '17', label: 'Writing', emoji: '✍️' },
    { id: '18', label: 'Tech', emoji: '🤖' },
    { id: '19', label: 'Science', emoji: '🔬' },
    { id: '20', label: 'Food', emoji: '🍕' },
];

export default function EmojiSpreeChipsDemo() {
    const handleChange = (selectedIds: string[]) => {
        console.log('Selected interests:', selectedIds);
    };

    return (
        <div className="flex items-center justify-centerrelative overflow-hidden ">
            <EmojiSpreeChips
                interests={INTERESTS}
                onChange={handleChange}
            />
        </div>
    );
}
