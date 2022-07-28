import clsx from 'clsx';

import IconLocation from '@/components/Icon/IconLocation';

const CreatorFormLocation = () => {
    return (
        <div className="px-3 flex-between border-t border-line">
            <input
                placeholder="Add location"
                className={clsx('text-sm py-3 w-full', 'placeholder:text-base-1 placeholder:text-base-gray')}
            />
            <IconLocation />
        </div>
    );
};

export default CreatorFormLocation;
