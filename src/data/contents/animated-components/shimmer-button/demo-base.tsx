import { ShimmerButton } from './base';

export default function ShimmerButtonDemo() {
  return (
    <div className="theme-injected flex items-center justify-center gap-4 p-10">
      <ShimmerButton className='bg-primary text-primary-foreground'>Hover Me</ShimmerButton>
      <ShimmerButton className='bg-secondary text-secondary-foreground'>Subscribe</ShimmerButton>
    </div>
  );
}
