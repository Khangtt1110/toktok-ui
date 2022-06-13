import HeadlessTippy from '@tippyjs/react/headless'; // different import path!
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useDebounce } from '~/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, SetSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    const handleHideResult = () => {
        setShowResult(false);
    };

    useEffect(() => {
        if (!debounced.trim()) {
            SetSearchResult([]);
            return;
        } 

        setLoading(true);
        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less`)
        // chuyen json thanh js object
            .then((res) => res.json())
            .then((res) => {
                SetSearchResult(res.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);

    return (
        <HeadlessTippy
            visible={showResult && searchResult.length > 0}
            interactive="true"
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search account and video"
                    spellCheck={false}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')}>
                        <FontAwesomeIcon
                            icon={faCircleXmark}
                            //focus and clear text
                            onClick={() => {
                                setSearchValue('');
                                SetSearchResult([]);
                                inputRef.current.focus();
                            }}
                        />
                    </button>
                )}
                {loading && <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />}
                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
