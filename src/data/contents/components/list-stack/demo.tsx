import { LuTent } from 'react-icons/lu';
import { ListStack } from '.';
import { FaFireFlameCurved, FaSailboat } from 'react-icons/fa6';


const items = [
  {
    id: '1',
    title: 'Camping',
    location: 'Yosemite Park',
    date: '5 August',
    icon: LuTent,
  },
  {
    id: '2',
    title: 'Boating',
    location: 'Lake Tahoe Park',
    date: '2 August',
    icon: FaSailboat,
  },
  {
    id: '3',
    title: 'Barbecue',
    location: 'Greenfield Shores',
    date: '28 July',
    icon: FaFireFlameCurved,
  },
  
];

function ListStackDemo () {
  return (
    <ListStack items={items} />
  )
}


export default ListStackDemo;