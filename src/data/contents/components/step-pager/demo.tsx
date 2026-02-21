import { StepPager } from '.';
import { BsMusicNoteList } from 'react-icons/bs';
import { HiOutlineAdjustments } from 'react-icons/hi';
import { MdFavorite } from 'react-icons/md';
import { RiBubbleChartFill } from 'react-icons/ri';

const items = [
  { id: 1, label: 'Explore', icon: RiBubbleChartFill },
  { id: 2, label: 'Curate', icon: MdFavorite },
  { id: 3, label: 'Mix', icon: HiOutlineAdjustments },
  { id: 4, label: 'Play', icon: BsMusicNoteList },
];

export default function StepPagerDemo() {
  return <StepPager steps={items} />;
}
