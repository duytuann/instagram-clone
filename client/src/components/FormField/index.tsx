import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { InputContainer, Span, Input } from './styles';

interface FormFieldProps {
    register: UseFormRegisterReturn;
    placeholder: string;
    className?: string;
    type?: InputHTMLAttributes<HTMLInputElement>['type'];
    errors: {
        [x: string]: any;
    };
}

const FormField = ({ register, errors, placeholder, type = 'text', className }: FormFieldProps) => {
    const errorMessage = errors[register.name]?.message;

    <input type="checkbox" />;

    return (
        <div>
            <InputContainer>
                <Input {...register} type={type} placeholder={placeholder} />
            </InputContainer>
            {errorMessage && <Span>{errorMessage}</Span>}
        </div>
    );
};

export default FormField;
