import { Link } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import './Path.css';

import { Context } from "../main"; //can make custom hook

const Path = ({ book, chapter }) => {
    const [language, setLanguage] = useContext(Context);
    return (
        <>
            <div id="container">
                <Link to="/" className="link">
                    {language === 'english'
                        ? 'The Book of Mormon'
                        : language === 'spanish'
                            ? 'El Libro de Mormón'
                            : language === 'french'
                                ? 'Le Livre de Mormon'
                                : language === 'german'
                                    ? 'Das Buch Mormon'
                                    : 'The Book of Mormon'}
                </Link> {/* Always render this link */}
                {/* Render book.bookName link only if book is defined */}
                {book && <Link to={`/${book.urlName}`} className="link">{book.bookName}</Link>}
                {/* Render chapter link only if both book and chapter are defined */}
                {book && chapter && <Link to={`/${book.urlName}/${chapter}`} className="link">{language === 'english'
                    ? 'Chapter'
                    : language === 'spanish'
                        ? 'Capítulo'
                        : language === 'french'
                            ? 'Chapitre'
                            : language === 'german'
                                ? 'Kapitel'
                                : 'Chapter'} {chapter}</Link>}
            </div>
        </>
    )
}
export default Path;