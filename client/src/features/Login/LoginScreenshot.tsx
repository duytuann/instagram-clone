import { useEffect, useState } from 'react';

import { emptyScreenshot, screenshot1, screenshot2, screenshot3, screenshot4 } from '@/assets/images';
import { LoginScreenshotContainer, Image } from './styles';

const screenshots = [screenshot1, screenshot2, screenshot3, screenshot4];

const LoginScreenshot = () => {
    const [visibleIndex, setVisibleIndex] = useState<number>(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setVisibleIndex((prevIndex) => (prevIndex >= screenshots.length - 1 ? 0 : prevIndex + 1));
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <LoginScreenshotContainer>
            <img src={emptyScreenshot} alt="Screenshot" draggable={false} />
            {screenshots.map((screenshot, index: number) => (
                <Image
                    isEqual={index === visibleIndex}
                    key={screenshot}
                    src={screenshot}
                    alt="Screenshot"
                    draggable={false}
                />
            ))}
        </LoginScreenshotContainer>
    );
};

export default LoginScreenshot;
