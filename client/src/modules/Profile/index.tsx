import { useEffect } from 'react';
import { faBorderAll } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import ModalPostDetail from '@/components/Modal/ModalPostDetail';
import { changeCurrentUserNameProfile, getCurrentProfileStart } from '@/redux/slices/userSlice';
import { useAppSelector, useAppDispatch } from '@/hooks';
import ProfilePosts from '@/modules/Profile/components/ProfilePosts';
import ProfileDetail from '@/modules/Profile/components/ProfileDetail';
import Container from '@/components/Container';

const Profile = () => {
    const dispatch = useAppDispatch();
    const {
        data: { user },
    } = useAppSelector((state) => state.auth);
    const { showModalPostDetails } = useAppSelector((state) => state.global.data);
    useEffect(() => {
        const url = window.location.href;
        const params = url.split('/');
        const username = params[params.length - 1];
        if (params.length < 2) {
            dispatch(changeCurrentUserNameProfile(''));
        } else {
            dispatch(changeCurrentUserNameProfile(username));
            dispatch(getCurrentProfileStart(username));
        }
    }, [window.location.href]);

    return (
        <Container className={clsx('pt-9 pb-20')}>
            <section className="grid grid-cols-3">
                <ProfileDetail />
            </section>

            <section className="mt-14 border-t border-line">
                <div className="flex-center gap-x-16">
                    <button
                        className={clsx(
                            'relative',
                            'btn flex items-center -mt-[1px] pt-3 rounded-none border-t border-base-black',
                        )}
                    >
                        <FontAwesomeIcon icon={faBorderAll} className={clsx('mr-1.5 w-3.5')} />
                        <span className={clsx('text-sm font-medium')}>Posts</span>
                    </button>
                </div>
                <ProfilePosts userId={user.userId} />
            </section>
            {showModalPostDetails ? <ModalPostDetail /> : null}
        </Container>
    );
};

export default Profile;
