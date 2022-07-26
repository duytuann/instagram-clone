import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import { routes } from '@/routes/routes';
import { loginSchema } from '@/helpers/formSchemas';
import { LoginInput } from '@/utils/types';
// import { withRoute } from '~/hocs';
// import { useUserSelector } from '~/redux/selectors';
// import { useStoreDispatch } from '~/redux/store';
// import { userActions } from '~/redux/slices/userSlice';

import { SpinnerRing } from '@/components/Spinner';
import AuthLayout from '@/layouts/AuthLayout';
import FormField from '@/components/FormField';
import ButtonFacebook from '@/pages/Login/components/ButtonFacebook';
import ButtonGoogle from '@/pages/Login/components/ButtonGoogle';
import FormDivider from '@/components/FormDivider';
import LoginScreenshot from '@/features/Login/LoginScreenshot';
import { logo } from '@/assets/images';

const Login = () => {
    const isLoggedIn = false;
    const loginUserLoading = false;

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

    return (
        <AuthLayout>
            <div className={clsx('flex justify-center lg:w-container-w mx-auto')}>
                <LoginScreenshot />
                <div className={clsx('w-form-w py-9')}>
                    <div className="wrapper-border px-10 py-12">
                        <img className="mx-auto" src={logo} alt="Logo" />

                        <form className="flex flex-col gap-y-3 mt-10" onSubmit={() => {}}>
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
                                    isLoggedIn && 'btn--disabled',
                                    loginUserLoading && ['cursor-default pointer-events-none'],
                                )}
                            >
                                {loginUserLoading ? <SpinnerRing className="text-white" /> : 'Log in'}
                            </button>
                        </form>

                        <FormDivider className="my-3" />

                        <ButtonFacebook disabled={loginUserLoading || isLoggedIn} className="mt-6" />
                        <ButtonGoogle disabled={loginUserLoading || isLoggedIn} className="mt-3" />

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
