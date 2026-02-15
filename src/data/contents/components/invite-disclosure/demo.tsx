import { InviteDisclosure } from '.';
import { FaFolderClosed } from 'react-icons/fa6';
import { LuDraftingCompass } from 'react-icons/lu';
import { BiSolidZap } from 'react-icons/bi';
import { PiScrewdriverBold } from 'react-icons/pi';

const items = [
    {
        id: '1',
        title: 'Sonora Repository',
        description: 'Contribute to the code repository',
        icon: <FaFolderClosed className="w-4 h-4 text-[#868686]" />,
        hasUpdate: true,
    },
    {
        id: '2',
        title: 'Design Tokens',
        description: 'Collaborate on design tokens',
        icon: <LuDraftingCompass className="w-5 h-5 text-[#868686]" />,
        hasUpdate: true,
    },
    {
        id: '3',
        title: 'Motion Kit',
        description: 'Contribute to motion components',
        icon: <BiSolidZap className="w-5 h-5 text-[#868686]" />,
    },
    {
        id: '4',
        title: 'Build Tools',
        description: 'Explore build tools & pipeline',
        icon: <PiScrewdriverBold className="w-5 h-5 text-[#868686]" />,
    },
];

export default function InviteDisclosureDemo() {

    return (
        <div className="flex items-center justify-center">
            <InviteDisclosure title={'Invites'}
                badgeCount={2}
                invites={items} />
        </div>
    );
}