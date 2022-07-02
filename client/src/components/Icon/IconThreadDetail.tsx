// types
import { IconProps } from '@/utils/types';

const IconThreadDetail = ({ active, ...rest }: IconProps) => {
    return active ? (
        <svg
            {...rest}
            aria-label="Navigate back to chat from thread details"
            color="#262626"
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
        >
            <path d="M12.001.504a11.5 11.5 0 1011.5 11.5 11.513 11.513 0 00-11.5-11.5zm-.182 5.955a1.25 1.25 0 11-1.25 1.25 1.25 1.25 0 011.25-1.25zm1.614 11.318h-2.865a1 1 0 010-2H11V12.05h-.432a1 1 0 010-2H12a1 1 0 011 1v4.727h.433a1 1 0 110 2z"></path>
        </svg>
    ) : (
        <svg
            {...rest}
            aria-label="View Thread Details"
            color="#262626"
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
        >
            <circle
                cx="12.001"
                cy="12.005"
                fill="none"
                r="10.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            ></circle>
            <circle cx="11.819" cy="7.709" r="1.25"></circle>
            <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="10.569"
                x2="13.432"
                y1="16.777"
                y2="16.777"
            ></line>
            <polyline
                fill="none"
                points="10.569 11.05 12 11.05 12 16.777"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            ></polyline>
        </svg>
    );
};

export default IconThreadDetail;
