import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

interface ButtonFacebookProps {
    disabled?: boolean;
    className?: string;
}

const ButtonFacebook = ({ disabled, className }: ButtonFacebookProps) => {
    // Logic login with facebook
    // Just UI :(

    return (
        <button
            onClick={() => {}}
            className={clsx(
                'btn text-sm w-full gap-x-2 h-auth-btn-h',
                'text-white bg-primary',
                disabled && 'btn--disabled',
                className,
            )}
        >
            <FontAwesomeIcon icon={faFacebookSquare} className="text-white" size="lg" />
            <span>Log in with Facebook</span>
        </button>
    );
};

export default ButtonFacebook;
