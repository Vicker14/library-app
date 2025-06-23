const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();

    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read ? 'already read' : 'not read yet'}`
    };
};

const theHobbit = new Book('The Hobbit', 'Tolkien', 295, true);
const gameOfThrones = new Book('Game of Thrones', 'George R.R. Martin', 1543, false);

function addBookToLibrary(newBook) {
    myLibrary.push(newBook)
}

addBookToLibrary(theHobbit);
addBookToLibrary(gameOfThrones);

const readBooks = document.querySelector(".read");
const totalBooks = document.querySelector(".total");

totalBooks.textContent = `${myLibrary.length}`;

let booksRead = 0;

for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].read === true) booksRead++;
}

readBooks.textContent = `${booksRead}`;