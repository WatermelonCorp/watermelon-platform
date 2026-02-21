import { RunActionButton } from '.';
import { FaInbox } from 'react-icons/fa6';
import { RiBubbleChartFill } from 'react-icons/ri';
import { BsFileTextFill, BsSendFill, BsTagFill } from 'react-icons/bs';
import { TbClockHour12Filled } from 'react-icons/tb';

const items = [
  { id: 1, label: 'Importing Survey Data', icon: FaInbox },
  { id: 2, label: 'Refining Responses', icon: RiBubbleChartFill },
  { id: 3, label: 'Labelling Responses', icon: BsTagFill },
  { id: 4, label: 'Analyzing Sentiment', icon: TbClockHour12Filled },
  { id: 5, label: 'Creating Reports', icon: BsFileTextFill },
  { id: 6, label: 'Sharing Survey Report', icon: BsSendFill },
];

export default function RunActionButtonDemo() {
  return <RunActionButton steps={items} />;
}
