import { faImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

const PostPhotoError = () => {
  return (
    <div className={clsx('flex-center flex-col w-full h-full py-40', 'bg-white')}>
      <FontAwesomeIcon icon={faImage} className='text-6xl' />
      <h2 className={'font-medium text-xl mt-3'}>Sorry, Image Not Available</h2>
    </div>
  );
};

export default PostPhotoError;
