// types
import { IconProps } from '@/utils/types';

const IconClose = (props: IconProps) => {
    return (
        <svg
            {...props}
            aria-label="Close"
            color="#ffffff"
            fill="#ffffff"
            height="16"
            role="img"
            viewBox="0 0 24 24"
            width="16"
        >
            <polyline
                fill="none"
                points="20.643 3.357 12 12 3.353 20.647"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
            ></polyline>
            <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                x1="20.649"
                x2="3.354"
                y1="20.649"
                y2="3.354"
            ></line>
        </svg>
    );
};

export default IconClose;
