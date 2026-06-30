import SplitActions from './original';
import { PenTool, Share2 } from 'lucide-react';

export default function DemoOriginal() {
  const actions = [
    { icon: PenTool, label: 'Edit' },
    { icon: Share2, label: 'Share' },
  ];
  return <SplitActions actions={actions} />;
}
