import React, { useEffect } from 'react';

import Post from '@/components/Post';
import Container from '@/components/Container';
import { useAppDispatch, useAppSelector, useIntersectionObserver } from '@/hooks';
import { getAllPostStart } from '@/redux/slices/postSlice';

interface IHomeProps {}

const Home: React.FC<IHomeProps> = () => {
    const dispatch = useAppDispatch();

    const {
        data: { posts },
    } = useAppSelector((state) => state.post);

    const { observerRef, isIntersecting } = useIntersectionObserver({
        rootMargin: '500px',
    });

    useEffect(() => {
        dispatch(getAllPostStart());
    }, []); // dependency [cursor, isIntersecting, getPosts, dispatch]

    return (
        <Container className="grid grid-cols-3 pt-7">
            <section className="col-span-3 lg:col-span-2 pb-10 space-y-5">
                {posts.map((post) => (
                    <Post key={post.PostId} {...post} />
                ))}
                <div ref={observerRef} />
            </section>
            <section className="hidden lg:block pl-5 pt-4">
                <h1 className="flex items-center text-sm-1">Recommend Flow</h1>
            </section>
        </Container>
    );
};

export default Home;
