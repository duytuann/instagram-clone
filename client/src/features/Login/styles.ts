import styled from 'styled-components';

interface Props {
    isEqual: boolean;
}

export const LoginScreenshotContainer = styled.div`
    display: none;
    position: relative;
    margin-top: 2.25rem;
    height: 581.15px;

    @media (min-width: 1024px) {
        display: block;
    }
`;

export const Image = styled.img<Props>`
    position: absolute;
    right: 60px;
    bottom: 16px;
    transition-property: all;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);

    ${(p) => (p.isEqual ? 'visibility: visible; opacity: 1; ' : 'visibility: hidden; opacity: 0; ')}
`;
