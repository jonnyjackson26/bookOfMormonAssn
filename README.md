# Book of Mormon Web Application

The purpose of this project is to make the text of the Book of Mormon more accesible for people all over the world. 
This is a single page application built with react, which means its much faster than the Churchs Gospel Library Website

The ultimate goal of this project is that any annotations/markings/highlights made in one language will transfer over to all other languages, something that the church's website does not offer. I ran into this problem on my mission when I would markup my scriptures in english but then not have those markings in spanish.

## Format of this project

The bom folder contains all the data pretty much.
Inside is a folder for each language, named "bom-english" or "bom-spanish" etc. The language is in english, not the native language. (for example, its not "bom-espanol" or "bom-francais")
Each of these folders have subfolders named after the english books in the BOM. And each of those folders have as many text files as chapters in that book. They are named the chapter number (1.txt or 22.txt, etc)
In each of these files, each verse takes up one line.
```
bom 
   bom-english
       1-nephi
           1.txt
           2.txt
           3.txt
           ...
        2-nephi
           1.txt
           2.txt
           ...
        ...
    bom-spanish
        1-nephi
           1.txt
           2.txt
           3.txt
           ...
        2-nephi
           1.txt
           2.txt
           ...
        ...
    bom-french
    ...
```

## When adding a new language in the future:

All you need to do is update the _languages.js file inside the languages folder