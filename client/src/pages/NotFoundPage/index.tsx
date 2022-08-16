import { Link } from 'react-router-dom';

import Header from '@/layouts/components/Header';
import { routes } from '@/routes/routes';
import Container from '@/components/Container';

const NotFoundPage = () => {
    return (
        <>
            <Header />
            <Container className="text-center pt-12">
                <h1 className="font-medium text-xl">Sorry, this page isn&apos;t available.</h1>
                <p className="mt-8 text-base">
                    The link you followed may be broken, or the page may have been removed.{' '}
                    <Link to={routes.home}>
                        <a className="text-primary">Go back to Instagram</a>
                    </Link>
                    .
                </p>
            </Container>
        </>
    );
};

export default NotFoundPage;
