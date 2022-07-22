import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    align-content: space-between;
`;

const DivTopBot = styled.div`
    width: 100%;
    height: 0.125rem;
`;

const DivCenter = styled.div`
    margin-left: 1rem;
    margin-right: 1rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
`;

interface FormDividerProps {
    className?: string;
}

const FormDivider = ({ className }: FormDividerProps) => {
    return (
        <Container>
            <DivTopBot />
            <DivCenter>OR</DivCenter>
            <DivTopBot />
        </Container>
    );
};

export default FormDivider;
