import clsx from 'clsx';

interface FormDividerProps {
    className?: string;
}

const FormDivider = ({ className }: FormDividerProps) => {
    return (
        <div className={clsx('flex-between', className)}>
            <div className={clsx('h-0.5 w-full', 'bg-line')} />
            <div className={clsx('font-medium mx-4 text-sm', 'text-base-gray')}>OR</div>
            <div className={clsx('h-0.5 w-full', 'bg-line')} />
        </div>
    );
};

export default FormDivider;
