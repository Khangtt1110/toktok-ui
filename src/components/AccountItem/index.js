import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/7889456ed8fea66e75344f6a6e70f512~c5_100x100.jpeg?x-expires=1655002800&x-signature=cDSCRfBIK18wwnhJrioCBCg93bc%3D"
                alt="avatar"
            />
            <div className={cx('infor')}>
                <h4 className={cx('name')}>
                    <span>Nguyen Van A</span>
                    <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle}></FontAwesomeIcon>
                </h4>
                <span className={cx('usename')}>nguyenvana</span>
            </div>
        </div>
    );
}

export default AccountItem;
