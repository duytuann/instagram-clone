import * as yup from 'yup';

export const registerSchema = yup
    .object({
        email: yup.string().required('Email is required').email('Invalid email'),
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required').min(3, 'Password must be greater than 3'),
    })
    .required();

export const loginSchema = yup
    .object({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required'),
    })
    .required();

export const changePasswordSchema = yup.object({
    password: yup.string().required('Password is required').min(3, 'Password must be greater than 3'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Password must match'),
});
