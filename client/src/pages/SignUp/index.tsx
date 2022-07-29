import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import { ReduxStateType } from '@/redux/types';
import { routes } from '@/routes/routes';
import { signUpParams } from '@/core/http/apis/user/types';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { SpinnerRing } from '@/components/Spinner';
import FormDivider from '@/components/FormDivider';
import FormField from '@/components/FormField';
import { createUserStart } from '@/redux/slices/userSlice';
import { registerSchema } from '@/helpers/formSchemas';
import ButtonFacebook from '@/pages/Login/components/ButtonFacebook';
import ButtonGoogle from '@/pages/Login/components/ButtonGoogle';
import { logo } from '@/assets/images';

const SignUp = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        data: { isAuthenticated },
    } = useAppSelector((state) => state.auth);

    const {
        data: { isCreateDone },
        status,
    } = useAppSelector((state) => state.user);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setFocus,
        setError,
    } = useForm<signUpParams>({
        resolver: yupResolver(registerSchema),
    });

    const handleRegisterSubmit = ({ email, password, username, name }: signUpParams) => {
        dispatch(createUserStart({ email, password, username, name }));
    };

    useEffect(() => setFocus('email'), [setFocus]);

    useEffect(() => {
        if (isCreateDone === true) {
            navigate('/');
        }
    }, [isCreateDone]);

    return (
        <div className={clsx('w-form-w mx-auto py-9')}>
            <div className="wrapper-border px-10 py-12">
                <img className="mx-auto" src={logo} alt="Logo" />
                <h1 className={clsx('font-medium mt-4 text-center', 'text-base-gray')}>
                    Sign up to see photos and videos from your friends.
                </h1>

                <ButtonFacebook disabled={isAuthenticated} className="mt-3" />
                <ButtonGoogle disabled={isAuthenticated} className="mt-3" />

                <FormDivider className="my-3" />

                <form className="flex flex-col gap-y-3" onSubmit={handleSubmit(handleRegisterSubmit)}>
                    <FormField register={register('email')} placeholder="Email" errors={errors} />
                    <FormField register={register('name')} placeholder="Full name" errors={errors} />
                    <FormField register={register('username')} placeholder="Username" errors={errors} />
                    <FormField register={register('password')} placeholder="Password" errors={errors} type="password" />
                    <button
                        className={clsx(
                            'btn text-sm h-auth-btn-h w-full gap-x-2 mt-2',
                            'text-white bg-primary',
                            status === ReduxStateType.LOADING && ['cursor-default pointer-events-none'],
                        )}
                    >
                        {status === ReduxStateType.LOADING ? <SpinnerRing className="text-white" /> : 'Sign up'}
                    </button>
                    <p className={clsx('text-xs text-center mt-2', 'text-base-gray')}>
                        By signing up, you agree to our <span className="font-medium">Terms</span>,{' '}
                        <span className="font-medium">Data Policy</span> and{' '}
                        <span className="font-medium">Cookies Policy</span>.
                    </p>
                </form>
            </div>

            <div className="wrapper-border flex-center text-sm py-6 mt-3">
                Have an account?
                <Link to={routes.logIn}>
                    <a className={clsx('ml-1', 'text-primary')}>Log in</a>
                </Link>
            </div>
        </div>
    );
};

export default SignUp;
