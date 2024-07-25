import React, { useState } from 'react';
import styles from './note.module.scss';
import { formatDate } from '../../../utils/formatDate';
import { Icon } from '@iconify/react';

function Note(props) {
    const { text, date, color } = props;
    const [expand, setExpand] = useState(false);
    const [noteText, setNoteText] = useState("");

    const handleSave = () => {
        console.log('Save button clicked');
    };

    return (
        <article className={styles.container} style={{ backgroundColor: color }}>
            <div className={styles.content}>
                {!text.length ? (
                    <textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        className={styles.textarea}
                    />
                ) : (
                    <>
                        <p className={expand ? styles.expanded : ""}>{text}</p>
                        {text.length > 154 ? (
                            <button onClick={() => setExpand((prev) => !prev)} className={styles.readMoreBtn}>
                                Read {expand ? 'Less' : 'More'}
                            </button>
                        ) : null}
                    </>
                )}
            </div>
            <footer className={styles.footer}>
                <div>
                    <span>{formatDate(date)}</span>
                </div>
            </footer>
        </article>
    );
}

export default Note;
