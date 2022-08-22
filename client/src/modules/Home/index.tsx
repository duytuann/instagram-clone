import React, { useEffect } from 'react';

import HomeWidgets from '@/modules/Home/HomeWidget';
import Post from '@/components/Post';
import Container from '@/components/Container';
import ModalPostDetail from '@/components/Modal/ModalPostDetail';
import { useAppDispatch, useAppSelector, useIntersectionObserver } from '@/hooks';
import { getAllPostStart } from '@/redux/slices/postSlice';

interface IHomeProps {}

const Home: React.FC<IHomeProps> = () => {
    const dispatch = useAppDispatch();

    const {
        data: { posts },
    } = useAppSelector((state) => state.post);
    const { showModalPostDetails } = useAppSelector((state) => state.global.data);

    const { observerRef, isIntersecting } = useIntersectionObserver({
        rootMargin: '500px',
    });

    useEffect(() => {
        dispatch(getAllPostStart());
    }, []); // dependency [cursor, isIntersecting, getPosts, dispatch]

    return (
        <Container className="grid grid-cols-8 pt-7">
            <section></section>
            <section className="col-span-8 lg:col-span-4 pb-10 space-y-5">
                {posts.map((post) => (
                    <Post key={post.postId} {...post} />
                ))}
                <div ref={observerRef} />
            </section>
            <section className="hidden lg:block lg:col-span-2 pl-5 pt-4">
                <HomeWidgets />
            </section>
            {showModalPostDetails ? <ModalPostDetail /> : null}
        </Container>
    );
};

export default Home;
