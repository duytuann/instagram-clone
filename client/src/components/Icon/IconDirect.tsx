// types
import { IconProps } from '@/utils/types';

const IconDirect = (props: IconProps) => {
    return (
        <svg
            {...props}
            aria-label="Direct"
            color="#262626"
            fill="#262626"
            height="96"
            role="img"
            viewBox="0 0 96 96"
            width="96"
        >
            <circle
                cx="48"
                cy="48"
                fill="none"
                r="47"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            ></circle>
            <line
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="69.286"
                x2="41.447"
                y1="33.21"
                y2="48.804"
            ></line>
            <polygon
                fill="none"
                points="47.254 73.123 71.376 31.998 24.546 32.002 41.448 48.805 47.254 73.123"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
            ></polygon>
        </svg>
    );
};

export default IconDirect;
