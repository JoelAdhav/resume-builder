import React from 'react';
import styles from './Header.module.css';
import resumeSvg from '../../assets/resume.svg';

const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <p className={styles.heading}>
                    Create a <span>Resume</span> to land your next Job
                </p>
                <p className={styles.heading}>
                    The Ultimate Resume <span>Builder</span>
                </p>
            </div>
            <div className={styles.right}>
                <img src={resumeSvg} alt='Resume' />
            </div>
        </div>
    );
};

export default Header;
