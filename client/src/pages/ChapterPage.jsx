import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { theBookOfBOOKNAMEchapterX } from "../../languages/_languages.js"
import './ChapterPage.css';
import { Context } from "../main";

export function ChapterPage({ book, chapter }) {
    const [verses, setVerses] = useState([]);
    const [language, setLanguage] = useContext(Context);

    useEffect(() => {
        const fetchVerses = async () => {
            try {

                //get all the favs that have bookNum==book.bookNum and chapterNum==chapter
                const responseForStarredVerses = await fetch(`/api/get_starred_verses/${book.bookNum}/${chapter}`);
                if (!responseForStarredVerses.ok) {
                    throw new Error('Failed to fetch starred verses');
                }
                const starred = await responseForStarredVerses.json();
                console.log('starred verses:', starred);


                const response = await fetch(`././bom/bom-${language}/${book.urlName}/${chapter}.txt`);
                const text = await response.text();
                const lines = text.split('\n').slice(0, -1); //I slice because the text files have an empty \n at the end

                setVerses(lines.map((line, index) =>
                    <div key={index} className={`verse-container ${starred.some(item => item.verseNum === index) ? 'starred-verse' : ''}`}>
                        <button onClick={() => star(index)} className={`fav-button ${starred.some(item => item.verseNum === index) ? 'filled' : ''}`}></button>
                        <p> {index + 1} {line}</p>
                    </div>
                ));
            } catch (error) {
                console.error('Error fetching verses:', error);
            }
        };

        fetchVerses();
    }, [book.urlName, chapter, language]);

    const star = async (index) => {
        try {
            const data = { verseNum: index, chapterNum: chapter, bookNum: book.bookNum };

            // Make the HTTP POST request using fetch
            const response = await fetch('/create_star/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) { throw new Error('Failed to create star'); }

            // Parse the JSON response
            const responseData = await response.json();
            console.log('Star created successfully:', responseData);

            // Update the state
            setVerses(prevVerses => {
                const newVerses = [...prevVerses];
                newVerses[index] = (
                    <div key={index} className={`verse-container starred-verse`}>
                        <button onClick={() => star(index)} className={`fav-button filled`}></button>
                        <p>{newVerses[index].props.children[1].props.children}</p>
                    </div>
                );
                return newVerses;
            });

        } catch (error) {
            console.error('Error creating star:', error);
        }
    }




    return (
        <>
            <NavBar book={book} chapter={chapter} />
            <h1>
                {theBookOfBOOKNAMEchapterX(language, book.bookName, chapter)}
            </h1>

            {verses}
        </>
    );
}