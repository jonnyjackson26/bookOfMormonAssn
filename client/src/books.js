class Book {
    constructor(numOfChapters, bookName, urlName, bookNum) {
        this.numOfChapters = numOfChapters;
        this.bookName = bookName;
        this.urlName = urlName;
        this.bookNum = bookNum; //1 nephi is 0, 2 nephi is 1. I need this bc i pass the book object to the chapter page but it doesnt know what index it is to store in the database
    }

    getCoverPicPath() {
        return `${this.urlName}-cover.jpg`;
    }
}


const books = [
    new Book(22, "1 Nephi", "1-nephi", 1),
    new Book(33, "2 Nephi", "2-nephi", 2),
    new Book(7, "Jacob", "jacob", 3),
    new Book(1, "Enos", "enos", 4),
    new Book(1, "Jarom", "jarom", 5),
    new Book(1, "Omni", "omni", 6),
    new Book(1, "Words of Mormon", "words-of-mormon", 7),
    new Book(29, "Mosiah", "mosiah", 8),
    new Book(63, "Alma", "alma", 9),
    new Book(16, "Helaman", "helaman", 10),
    new Book(30, "3 Nephi", "3-nephi", 11),
    new Book(1, "4 Nephi", "4-nephi", 12),
    new Book(9, "Mormon", "mormon", 13),
    new Book(15, "Ether", "ether", 14),
    new Book(10, "Moroni", "moroni", 15)
];
export default books;