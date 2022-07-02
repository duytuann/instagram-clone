// types
import { IconProps } from '@/utils/types';

const IconComment = (props: IconProps) => {
    return (
        <svg
            {...props}
            aria-label="Comment"
            color="#262626"
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
        >
            <path
                d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
            ></path>
        </svg>
    );
};

export default IconComment;
