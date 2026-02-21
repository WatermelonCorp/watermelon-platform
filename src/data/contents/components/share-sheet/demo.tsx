import { ShareSheet } from ".";

const users = [
  {
    id: '1',
    name: 'Ashish Kashyap',
    avatar: 'https://i.pravatar.cc/150?u=ashish',
  },
  {
    id: '2',
    name: 'Nitish Khagwal',
    avatar: 'https://i.pravatar.cc/150?u=nitish',
  },
  {
    id: '3',
    name: 'Rahul Bhadoriya',
    avatar: 'https://i.pravatar.cc/150?u=rahul',
  },
  {
    id: '4',
    name: 'Sakshi Sharma',
    avatar: 'https://i.pravatar.cc/150?u=sakshi',
  },
  { id: '5', name: 'Vikas Raj', avatar: 'https://i.pravatar.cc/150?u=vikas' },
];

export default function ShareSheetDemo() {
  return (
    <div className="flex  w-full items-center justify-center bg-white font-sans">
      <ShareSheet
        users={users}
        onShareComplete={(user) => console.log(`Shared with ${user.name}`)}
      />
    </div>
  );
}
