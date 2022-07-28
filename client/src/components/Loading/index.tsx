import clsx from 'clsx';

import SpinnerLogo from '@/components/Spinner/SpinnerLogo';

interface LoadingProps {
    title: string;
}

const Loading = ({ title }: LoadingProps) => {
    return (
        <div
            className={clsx(
                'flex flex-col m-auto rounded-lg md:w-[515px] h-[80vh] max-w-full overflow-hidden',
                'bg-white',
            )}
        >
            <div className={clsx('sticky top-0', 'flex-center text-sm py-3 border-b border-line')}>
                <span className="font-medium text-lg">{title}</span>
            </div>
            <div className="flex-center flex-grow">
                <SpinnerLogo className="w-20" />
            </div>
        </div>
    );
};

export default Loading;
