import React, { forwardRef, useState, useEffect, useRef } from 'react';
import {
    AtSign,
    Calendar,
    GitHub,
    Linkedin,
    MapPin,
    Paperclip,
    Phone,
} from 'react-feather';
import styles from './Resume.module.css';

const Resume = forwardRef(({ information, sections, activeColor }, ref) => {
    const [columns, setColumns] = useState([[], []]);
    const [source, setSource] = useState('');
    const [target, setTarget] = useState('');
    const containerRef = useRef();

    const info = {
        workExp: information[sections.workExp],
        projects: information[sections.projects],
        achievements: information[sections.achievements],
        education: information[sections.education],
        basicInfo: information[sections.basicInfo],
        summary: information[sections.summary],
        other: information[sections.other],
    };

    const getFormattedDate = value => {
        if (!value) return '';
        const date = new Date(value);

        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const swapSourcetarget = (source, target) => {
        if (!source || !target) return;
        const tempColumns = [[...columns[0]], [...columns[1]]];

        let sourceRowIndex = tempColumns[0].findIndex(item => item === source);
        let sourceColumnIndex = 0;

        if (sourceRowIndex < 0) {
            sourceColumnIndex = 1;
            sourceRowIndex = tempColumns[1].findIndex(item => item === source);
        }

        let targetRowIndex = tempColumns[0].findIndex(item => item === target);
        let targetColumnIndex = 0;

        if (targetRowIndex < 0) {
            targetColumnIndex = 1;
            targetRowIndex = tempColumns[1].findIndex(item => item === target);
        }

        const tempSource = tempColumns[sourceColumnIndex][sourceRowIndex];
        tempColumns[sourceColumnIndex][sourceRowIndex] =
            tempColumns[targetColumnIndex][targetRowIndex];

        tempColumns[targetColumnIndex][targetRowIndex] = tempSource;

        setColumns(tempColumns);
    };

    const sectionsDiv = {
        [sections.workExp]: (
            <div
                key={'workExp'}
                draggable
                onDragOver={() => setTarget(info.workExp?.id)}
                onDragEnd={() => setSource(info.workExp?.id)}
                className={`${styles.section} ${
                    info.workExp?.sectionTitle ? '' : styles.hidden
                }`}
            >
                <div className={styles.sectionTitle}>
                    {info.workExp?.sectionTitle}
                </div>
                <div className={styles.content}>
                    {info.workExp?.details?.map(item => (
                        <div className={styles.item} key={item.title}>
                            {item.title ? (
                                <p className={styles.title}>{item.title}</p>
                            ) : (
                                <span />
                            )}
                            {item.companyName ? (
                                <p className={styles.subTitle}>
                                    {item.companyName}
                                </p>
                            ) : (
                                <span />
                            )}
                            {item.certificationLink ? (
                                <a
                                    className={styles.link}
                                    href={item.certificationLink}
                                >
                                    <Paperclip />
                                    {item.certificationLink}
                                </a>
                            ) : (
                                <span />
                            )}
                            {item.startDate && item.endDate ? (
                                <div className={styles.date}>
                                    <Calendar />{' '}
                                    {getFormattedDate(item.startDate)} -
                                    {getFormattedDate(item.endDate)}
                                </div>
                            ) : (
                                <span />
                            )}
                            {item.location ? (
                                <p className={styles.date}>
                                    <MapPin />
                                    Remote
                                </p>
                            ) : (
                                <span />
                            )}

                            {item.points?.length > 0 ? (
                                <ul className={styles.points}>
                                    {item.points?.map((elem, index) => (
                                        <li
                                            className={styles.point}
                                            key={elem + index}
                                        >
                                            {elem}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <span />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        ),
        [sections.projects]: (
            <div
                key={'projects'}
                draggable
                onDragOver={() => setTarget(info.projects?.id)}
                onDragEnd={() => setSource(info.projects?.id)}
                className={`${styles.section} ${
                    info.projects?.sectionTitle ? '' : styles.hidden
                }`}
            >
                <div className={styles.sectionTitle}>
                    {info.projects?.sectionTitle}
                </div>
                <div className={styles.content}>
                    {info.projects?.details?.map(item => (
                        <div className={styles.item}>
                            {item.title ? (
                                <p className={styles.title}>{item.title}</p>
                            ) : (
                                <span />
                            )}
                            {item.link ? (
                                <a className={styles.link} href={item.link}>
                                    <Paperclip />
                                    {item.link}
                                </a>
                            ) : (
                                <span />
                            )}
                            {item.github ? (
                                <a className={styles.link} href={item.github}>
                                    <GitHub />
                                    {item.github}
                                </a>
                            ) : (
                                <span />
                            )}
                            {item.overview ? (
                                <p className={styles.overview}>
                                    This is a dummy Project
                                </p>
                            ) : (
                                <span />
                            )}
                            {item.points?.length > 0 ? (
                                <ul className={styles.points}>
                                    {item.points?.map((elem, index) => (
                                        <li
                                            className={styles.point}
                                            key={elem + index}
                                        >
                                            {elem}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <span />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        ),
        [sections.achievements]: (
            <div
                key={'achievements'}
                draggable
                onDragOver={() => setTarget(info.achievements?.id)}
                onDragEnd={() => setSource(info.achievements?.id)}
                className={`${styles.section} ${
                    info.achievements?.sectionTitle ? '' : styles.hidden
                }`}
            >
                <div className={styles.sectionTitle}>
                    {info.achievements?.sectionTitle}
                </div>
                <div className={styles.content}>
                    {info.achievements?.points.length > 0 ? (
                        <ul className={styles.numbered}>
                            {info.achievements?.points?.map((elem, index) => (
                                <li className={styles.point} key={elem + index}>
                                    {elem}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <span />
                    )}
                </div>
            </div>
        ),
        [sections.education]: (
            <div
                key={'education'}
                draggable
                onDragOver={() => setTarget(info.education?.id)}
                onDragEnd={() => setSource(info.education?.id)}
                className={`${styles.section} ${
                    info.education?.sectionTitle ? '' : styles.hidden
                }`}
            >
                <div className={styles.sectionTitle}>
                    {info.education?.sectionTitle}
                </div>
                <div className={styles.content}>
                    {info.education?.details?.map(item => (
                        <div className={styles.item}>
                            {item.title ? (
                                <p className={styles.title}>{item.title}</p>
                            ) : (
                                <span />
                            )}
                            {item.college ? (
                                <p className={styles.subTitle}>
                                    {item.college}
                                </p>
                            ) : (
                                <span />
                            )}
                            {item.startDate && item.endDate ? (
                                <div className={styles.date}>
                                    <Calendar />{' '}
                                    {getFormattedDate(item.startDate)}-
                                    {getFormattedDate(item.endDate)}
                                </div>
                            ) : (
                                <span />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        ),
        [sections.summary]: (
            <div
                key={'summary'}
                draggable
                onDragOver={() => setTarget(info.summary?.id)}
                onDragEnd={() => setSource(info.summary?.id)}
                className={`${styles.section} ${
                    info.summary?.sectionTitle ? '' : styles.hidden
                }`}
            >
                <div className={styles.sectionTitle}>
                    {info.summary?.sectionTitle}
                </div>
                <div className={styles.content}>
                    <div className={styles.overview}>
                        {info.summary?.summary}
                    </div>
                </div>
            </div>
        ),
        [sections.other]: (
            <div
                key={'other'}
                draggable
                onDragOver={() => setTarget(info.other?.id)}
                onDragEnd={() => setSource(info.other?.id)}
                className={`${styles.section} ${
                    info.other?.sectionTitle ? '' : styles.hidden
                }`}
            >
                <div className={styles.sectionTitle}>
                    {info.other?.sectionTitle}
                </div>
                <div className={styles.content}>
                    <div className={styles.overview}>{info.other?.other}</div>
                </div>
            </div>
        ),
    };

    useEffect(() => {
        setColumns([
            [sections.projects, sections.education, sections.summary],
            [sections.workExp, sections.achievements, sections.other],
        ]);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!activeColor || !container) return;
        container.style.setProperty('--color', activeColor);
    }, [activeColor]);

    useEffect(() => {
        swapSourcetarget(source, target);
    }, [source]);

    return (
        <div ref={ref}>
            <div ref={containerRef} className={styles.container}>
                <div className={styles.header}>
                    <p className={styles.heading}>
                        {info.basicInfo?.detail?.name}
                    </p>

                    <p className={styles.subHeading}>
                        {info.basicInfo?.detail?.title}
                    </p>
                    <div className={styles.links}>
                        {info.basicInfo?.detail?.email ? (
                            <a className={styles.link}>
                                <AtSign />
                                {info.basicInfo?.detail?.email}
                            </a>
                        ) : (
                            <span />
                        )}
                        {info.basicInfo?.detail?.phone ? (
                            <a className={styles.link}>
                                <Phone />
                                {info.basicInfo?.detail?.phone}
                            </a>
                        ) : (
                            <span />
                        )}
                        {info.basicInfo?.detail?.linkedin ? (
                            <a className={styles.link}>
                                <Linkedin />
                                {info.basicInfo?.detail?.linkedin}
                            </a>
                        ) : (
                            <span />
                        )}
                        {info.basicInfo?.detail?.github ? (
                            <a className={styles.link}>
                                <GitHub />
                                {info.basicInfo?.detail?.github}
                            </a>
                        ) : (
                            <span />
                        )}
                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles.col1}>
                        {columns[0].map(item => sectionsDiv[item])}
                    </div>
                    <div className={styles.col2}>
                        {columns[1].map(item => sectionsDiv[item])}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Resume;
