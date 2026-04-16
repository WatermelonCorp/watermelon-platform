import { Button } from '@/components/base-ui/button';

const Button39 = () => {
    return (
        <Button className='rounded-none relative '>
            Button

            <span className="absolute top-0 left-0 size-1 border-t border-l border-foreground" />
            <span className="absolute top-0 right-0 size-1 border-t border-r border-foreground" />
            <span className="absolute bottom-0 left-0 size-1 border-b border-l border-foreground" />
            <span className="absolute bottom-0 right-0 size-1 border-b border-r border-foreground" />
        </Button>
    );
}

export default Button39;