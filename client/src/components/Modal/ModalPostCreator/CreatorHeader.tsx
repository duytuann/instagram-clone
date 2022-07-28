import clsx from 'clsx';

// import { usePostSelector } from '@/redux/selectors';

interface CreatorHeaderProps {
    onCreateOrUpdateSubmit: () => void;
}

const CreatorHeader = ({ onCreateOrUpdateSubmit }: CreatorHeaderProps) => {
    // const { currentAction } = usePostSelector();

    return (
        <div className={clsx('sticky top-0 z-10', 'flex-center text-sm py-3 border-b border-line', 'bg-white')}>
            {/* <span className="font-medium">{currentAction === 'update' ? 'Edit Info' : 'Create new post'}</span> */}
            <button
                onClick={onCreateOrUpdateSubmit}
                className={clsx('abs-center-y right-3', 'btn float-right', 'text-primary')}
            >
                {/* {currentAction === 'update' ? 'Done' : 'Share'} */}
            </button>
        </div>
    );
};

export default CreatorHeader;
