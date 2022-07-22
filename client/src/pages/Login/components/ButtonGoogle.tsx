import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';

interface ButtonGoogleProps {
    disabled?: boolean;
    className?: string;
}

const Button = styled.button`
    font-size: 0.875rem;
    line-height: 1.25rem;
    width: 100%;
    column-gap: 0.5rem;
    color: #ffffff;
    background-color: rgb(248 113 113);
`;

const ButtonGoogle = ({ disabled, className }: ButtonGoogleProps) => {
    // Logic login with google
    // Just UI :(

    return (
        <Button onClick={() => {}}>
            <FontAwesomeIcon icon={faGoogle} style={{ color: '#fff' }} size="lg" />
            <span>Log in with Google</span>
        </Button>
    );
};

export default ButtonGoogle;
