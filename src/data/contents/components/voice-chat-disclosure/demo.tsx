import { VoiceChatDisclosure } from '.'

const myUsers = [
    { id: 1, name: "Oğuz", img: "https://i.pravatar.cc/150?u=oguz", active: true },
    { id: 2, name: "Ashish", img: "https://i.pravatar.cc/150?u=ashish" },
    { id: 3, name: "Mariana", img: "https://i.pravatar.cc/150?u=mariana" },
    { id: 4, name: "MDS", img: "https://i.pravatar.cc/150?u=mds" },
    { id: 5, name: "Ana", img: "https://i.pravatar.cc/150?u=ana" },
    { id: 6, name: "Natko", img: "https://i.pravatar.cc/150?u=natko", active: true },
    { id: 7, name: "Afshin", img: "https://i.pravatar.cc/150?u=afshin" },
];

function VoiceChatDisclosureDemo() {
    return (
        <div className="flex items-center justify-center">
            <VoiceChatDisclosure
                users={myUsers}
            />
        </div>
    )
}

export default VoiceChatDisclosureDemo