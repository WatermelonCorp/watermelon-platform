import { useParams } from 'react-router-dom';
import { dashboards } from '@/data/dashboards';
import { blocks } from '@/data/blocks';

export default function PreviewPage() {
  const { type, slug } = useParams<{ type: string; slug: string }>();

  let Component = null;
  if (type === 'dashboard') {
    Component = dashboards.find((d) => d.slug === slug)?.component;
  } else if (type === 'block') {
    Component = blocks.find((b) => b.slug === slug)?.component;
  }

  if (!Component) {
    return (
      <div className="flex items-center justify-center p-8 text-muted-foreground w-full h-screen">
        Preview not found for {type} / {slug}.
      </div>
    );
  }

  return (
    <div id="preview-root" className="w-full min-h-screen bg-background text-foreground overflow-x-hidden">
      <Component />
    </div>
  );
}
