import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';

interface ButtonFacebookProps {
    disabled?: boolean;
    className?: string;
}

const Button = styled.button`
    font-size: 0.875rem;
    line-height: 1.25rem;
    width: 100%;
    column-gap: 0.5rem;
    color: #ffffff;
`;

const ButtonFacebook = ({ disabled, className }: ButtonFacebookProps) => {
    // Logic login with facebook
    // Just UI :(

    return (
        <Button onClick={() => {}}>
            <FontAwesomeIcon icon={faFacebookSquare} style={{ color: '#fff' }} size="lg" />
            <span>Log in with Facebook</span>
        </Button>
    );
};

export default ButtonFacebook;
