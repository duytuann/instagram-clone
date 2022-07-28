import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

const CreatorFormSetting = () => {
    return (
        <div className={clsx('flex-between p-3 border-y-1 border-line', 'cursor-pointer')}>
            <span className={clsx('text-base-1')}>Advanced settings</span>
            <FontAwesomeIcon icon={faAngleDown} />
        </div>
    );
};

export default CreatorFormSetting;
