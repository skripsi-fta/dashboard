import { Loader2 } from 'lucide-react';
import { Button, type ButtonProps } from '../ui/button';

const CustomButtonComponent = ({
    label,
    disabled,
    loading,
    type,
    children,
    ...props
}: ButtonProps) => {
    return (
        <Button
            loading={loading}
            disabled={loading ?? disabled}
            {...props}
            type={type ?? 'button'}
        >
            {loading ? (
                <Loader2 className='mx-auto size-6 animate-spin' />
            ) : (
                (label ?? children)
            )}
        </Button>
    );
};

export default CustomButtonComponent;
