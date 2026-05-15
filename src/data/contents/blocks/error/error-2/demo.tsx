

import MissingState from './index';
import {
  RiArrowLeftSFill,
  RiCompassFill,
  RiHome5Fill,
  RiRefreshFill,
  RiSearch2Fill,
} from 'react-icons/ri';

export default function DemoPage() {
  return (
    <MissingState
      title="Looks like this destination drifted away."
      description="The page you attempted to open may have been archived, relocated, or is temporarily inaccessible."
      actions={[
        {
          label: 'Home',
          icon: <RiHome5Fill className="text-lg" />,
        },
        {
          label: 'Go back',
          icon: <RiArrowLeftSFill className="text-lg" />,
          variant: 'secondary',
        },
      ]}
      links={[
        {
          title: 'Explore collections',
          description:
            'Browse curated sections and continue navigating without losing context.',
          icon: <RiCompassFill className="text-xl" />,
        },
        {
          title: 'Search everything',
          description:
            'Use intelligent search to instantly locate projects, files, and resources.',
          icon: <RiSearch2Fill className="text-xl" />,
        },
        {
          title: 'Retry connection',
          description:
            'Refresh the current route and attempt to reconnect to the requested content.',
          icon: <RiRefreshFill className="text-xl" />,
        },
      ]}
    />
  );
}
