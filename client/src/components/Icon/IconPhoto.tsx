// types
import { IconProps } from '@/utils/types';

const IconPhoto = (props: IconProps) => {
    return (
        <svg
            {...props}
            aria-label="Add Photo or Video"
            color="#262626"
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
        >
            <path d="M6.549 5.013A1.557 1.557 0 108.106 6.57a1.557 1.557 0 00-1.557-1.557z" fillRule="evenodd"></path>
            <path
                d="M2 18.605l3.901-3.9a.908.908 0 011.284 0l2.807 2.806a.908.908 0 001.283 0l5.534-5.534a.908.908 0 011.283 0l3.905 3.905"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
            ></path>
            <path
                d="M18.44 2.004A3.56 3.56 0 0122 5.564h0v12.873a3.56 3.56 0 01-3.56 3.56H5.568a3.56 3.56 0 01-3.56-3.56V5.563a3.56 3.56 0 013.56-3.56z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            ></path>
        </svg>
    );
};

export default IconPhoto;
