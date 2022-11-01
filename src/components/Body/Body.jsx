import React, { useState, useEffect, useRef } from 'react';
import styles from './Body.module.css';
import { ArrowDown } from 'react-feather';
import Editor from '../Editor/Editor';
import ReactToPrint from 'react-to-print';
import Resume from '../Resume/Resume';

const Body = () => {
    const colors = ['#ed8936', '#a0aec0', '#1369b9', '#48bb78', '#0bc5ea'];
    const sections = {
        basicInfo: 'Basic Info',
        workExp: 'Work Experience',
        projects: 'Projects',
        education: 'Education',
        achievements: 'Achievements',
        summary: 'Summary',
        other: 'Other',
    };

    const resumeRef = useRef();

    const [activeColor, setActiveColor] = useState(colors[0]);
    const [resumeInformation, setResumeInformation] = useState({
        [sections.basicInfo]: {
            id: sections.basicInfo,
            sectionTitle: sections.basicInfo,
            detail: {},
        },
        [sections.workExp]: {
            id: sections.workExp,
            sectionTitle: sections.workExp,
            details: [],
        },
        [sections.projects]: {
            id: sections.projects,
            sectionTitle: sections.projects,
            details: [],
        },
        [sections.education]: {
            id: sections.education,
            sectionTitle: sections.education,
            details: [],
        },
        [sections.achievements]: {
            id: sections.achievements,
            sectionTitle: sections.achievements,
            points: [],
        },
        [sections.summary]: {
            id: sections.summary,
            sectionTitle: sections.summary,
            detail: '',
        },
        [sections.other]: {
            id: sections.other,
            sectionTitle: sections.other,
            detail: '',
        },
    });

    return (
        <div className={styles.container}>
            <p className={styles.heading}>Resume Builder</p>
            <div className={styles.toolbar}>
                <div className={styles.colors}>
                    {colors.map(item => (
                        <span
                            key={item}
                            style={{ backgroundColor: item }}
                            className={`${styles.color} ${
                                activeColor === item ? styles.active : ''
                            }`}
                            onClick={() => setActiveColor(item)}
                        />
                    ))}
                </div>
                <ReactToPrint
                    trigger={() => {
                        return (
                            <button>
                                Download <ArrowDown />
                            </button>
                        );
                    }}
                    content={() => resumeRef.current}
                />
            </div>
            <div className={styles.main}>
                <Editor
                    sections={sections}
                    information={resumeInformation}
                    setInformation={setResumeInformation}
                />
                <Resume
                    ref={resumeRef}
                    information={resumeInformation}
                    sections={sections}
                    activeColor={activeColor}
                />
            </div>
        </div>
    );
};

export default Body;
