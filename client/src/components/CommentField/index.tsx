import { Dispatch, FormEvent, SetStateAction } from 'react';
import clsx from 'clsx';

import { isEmptyInput } from '@/helpers/string';
import IconEmoji from '@/components/Icon/IconEmoji';
import { SpinnerRing } from '@/components/Spinner';

interface CommentFieldProps {
    caption: string;
    loading?: boolean;
    className?: string;
    onSubmit: () => void;
    onSetCaption: Dispatch<SetStateAction<string>>;
}

const CommentField = ({ className, caption, loading, onSetCaption, onSubmit }: CommentFieldProps) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className={clsx('flex items-center px-4 border-t-1 border-line', className)}>
            <IconEmoji className={clsx('mr-4', 'cursor-pointer')} />
            <input
                value={caption}
                onChange={(e) => onSetCaption(e.target.value)}
                className={clsx('text-sm w-full py-4', 'placeholder:text-base-gray')}
                placeholder="Add a comment..."
            />
            {loading ? (
                <SpinnerRing className="text-base-gray" />
            ) : (
                <button
                    className={clsx('btn ml-auto text-sm', 'text-primary', isEmptyInput(caption) && 'btn--disabled')}
                >
                    Post
                </button>
            )}
        </form>
    );
};

export default CommentField;
