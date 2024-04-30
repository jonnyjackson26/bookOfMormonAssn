import { Link } from "react-router-dom"
import NavBar from "../components/NavBar";
import React, { useState, useEffect, useContext } from 'react';

import myData, { theBookOfBOOKNAME } from "../../languages/_languages.js"

import { Context } from "../main";

export function BookPage({ book }) {
    const [language, setLanguage] = useContext(Context);

    const chapterLinks = [];
    for (let i = 1; i <= book.numOfChapters; i++) {
        chapterLinks.push(
            <Link key={i} to={`${i}`}>{myData[language]["chapter"]} {i}</Link> // Chapter 6 or Capitulo 6
        );
    }

    return (
        <>
            <NavBar book={book} chapter={undefined} />
            <h1>
                {theBookOfBOOKNAME(language, book.bookName)} {/* The Book of Jacob, or El Libro de Jacob etc */}
            </h1>

            {chapterLinks}
        </>
    );
}