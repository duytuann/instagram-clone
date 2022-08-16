import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

interface ButtonGoogleProps {
    disabled?: boolean;
    className?: string;
}

const ButtonGoogle = ({ disabled, className }: ButtonGoogleProps) => {
    // Logic login with google
    // Just UI :(

    return (
        <button
            onClick={() => {}}
            className={clsx(
                'btn text-sm w-full gap-x-2 h-auth-btn-h',
                'text-white bg-base-red',
                disabled && 'btn--disabled',
                className,
            )}
        >
            <FontAwesomeIcon icon={faGoogle} className="text-white" size="1x" />
            <span>Log in with Google</span>
        </button>
    );
};

export default ButtonGoogle;
