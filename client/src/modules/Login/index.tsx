import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import { ReduxStateType } from '@/redux/types';
import { routes } from '@/routes/routes';
import { loginSchema } from '@/helpers/formSchemas';
import { LoginInput } from '@/utils/types';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { LoginParams } from '@/core/http/apis/auth/types';
import { loginStart } from '@/redux/slices/authSlice';
import { SpinnerRing } from '@/components/Spinner';
import AuthLayout from '@/layouts/AuthLayout';
import FormField from '@/components/FormField';
import ButtonFacebook from '@/modules/Login/components/ButtonFacebook';
import ButtonGoogle from '@/modules/Login/components/ButtonGoogle';
import FormDivider from '@/components/FormDivider';
import LoginScreenshot from '@/modules/Login/components/LoginScreenshot';
import { logo } from '@/assets/images';

const Login = () => {
    let navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        data: { isAuthenticated },
        status,
    } = useAppSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors, isValidating },
        setFocus,
        setError,
        clearErrors,
    } = useForm<LoginInput>({
        resolver: yupResolver(loginSchema),
    });

    const handleLoginSubmit = async ({ password, username }: LoginParams) => {
        if (isAuthenticated) return;

        dispatch(loginStart({ username, password }));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <AuthLayout>
            <div className={clsx('flex justify-center lg:w-container-w mx-auto h-screen align-middle')}>
                <LoginScreenshot />
                <div className={clsx('w-form-w py-9 h-fit')}>
                    <div className="wrapper-border px-10 py-12">
                        <img className="mx-auto" src={logo} alt="Logo" />

                        <form className="flex flex-col gap-y-3 mt-10" onSubmit={handleSubmit(handleLoginSubmit)}>
                            <FormField register={register('username')} placeholder="Username" errors={errors} />
                            <FormField
                                register={register('password')}
                                placeholder="Password"
                                errors={errors}
                                type="password"
                            />

                            <button
                                type="submit"
                                className={clsx(
                                    'btn text-sm w-full gap-x-2 h-auth-btn-h mt-2',
                                    'text-white bg-primary',
                                    isAuthenticated && 'btn--disabled',
                                    status === ReduxStateType.LOADING && ['cursor-default pointer-events-none'],
                                )}
                            >
                                {status === ReduxStateType.LOADING ? <SpinnerRing className="text-white" /> : 'Log in'}
                            </button>
                        </form>

                        <FormDivider className="my-3" />

                        <ButtonFacebook
                            disabled={status === ReduxStateType.LOADING || isAuthenticated}
                            className="mt-6"
                        />
                        <ButtonGoogle
                            disabled={status === ReduxStateType.LOADING || isAuthenticated}
                            className="mt-3"
                        />

                        <Link to={routes.forgotPassword}>
                            <a className={clsx('block text-sm-1 w-full text-center mt-7', 'text-primary')}>
                                Forgot password?
                            </a>
                        </Link>
                    </div>

                    <div className="wrapper-border flex-center text-sm py-6 mt-3">
                        Don&apos;t have an account?
                        <Link to={routes.signUp}>
                            <a className={clsx('ml-1', 'text-primary')}>Sign up</a>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Login;
