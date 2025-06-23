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
const gsth = new Book('The Hobbit', 'Tolkien', 295, true);
const jfgsrd = new Book('The Hobbit', 'Tolkien', 295, true);
const gameOfThrones = new Book('Game of Thrones', 'George R.R. Martin', 1543, false);

function addBookToLibrary(newBook) {
    myLibrary.push(newBook)
}

addBookToLibrary(theHobbit);
addBookToLibrary(gameOfThrones);

// Logic for counter uptate

const readBooks = document.querySelector(".read");
const totalBooks = document.querySelector(".total");

totalBooks.textContent = `${myLibrary.length}`;

let booksRead = 0;

for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].read === true) booksRead++;
}

readBooks.textContent = `${booksRead}`;

// Logic to add new books

function displayBook(bookObject) {
    const name = bookObject.title;
    const author = bookObject.author;
    const pages = bookObject.pages;
    const read = bookObject.read;

    // agrupar hijos
    const infoHTML = document.createElement("div")
    infoHTML.setAttribute("class", "info");
    const nameHTML = document.createElement("div")
    nameHTML.setAttribute("class", "book-name");
    nameHTML.textContent = name;
    const authorHTML = document.createElement("div")
    authorHTML.setAttribute("class", "book-author");
    authorHTML.textContent = author;
    const pagesHTML = document.createElement("div", [class{"book-pages"}])
    pagesHTML.setAttribute("class", "book-pages");
    pagesHTML.textContent = pages;

    infoHTML.appendChild(nameHTML);
    infoHTML.appendChild(authorHTML);
    infoHTML.appendChild(pagesHTML);

    const controlsHTML = document.createElement("div")
    controlsHTML.setAttribute("class", "controls");

    const removeHTML = document.createElement("button")
    removeHTML.setAttribute("class", "remove-book")
    removeHTML.textContent = "remove";
    const checkboxHTML = document.createElement("input");
    checkboxHTML.setAttribute("type", "checkbox");
    checkboxHTML.setAttribute("class", "book-status");

    controlsHTML.appendChild(removeHTML);
    controlsHTML.appendChild(checkboxHTML);
    
    // agrupar en una card
    const cardHTML = document.createElement("div")
    cardHTML.setAttribute("class", "card");

    cardHTML.appendChild(infoHTML);
    cardHTML.appendChild(controlsHTML);

    // añadir a html
    container.insertBefore(cardHTML, container.firstChild);
};

const container = document.querySelector(".container");

for (let i = 0; i < myLibrary.length; i++) {
    displayBook(myLibrary[i]);
}