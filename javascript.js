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
const gameOfThrones = new Book('Game of Thrones', 'George R.R. Martin', 1543, true);

function addBookToLibrary(newBook) {
    myLibrary.push(newBook)
}

addBookToLibrary(theHobbit);
addBookToLibrary(gameOfThrones);

// Logic for counter uptate

const readBooks = document.querySelector(".read");
const totalBooks = document.querySelector(".total");

let booksRead = 0;
for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].read === true) booksRead++;
}

totalBooks.textContent = `${myLibrary.length}`;
readBooks.textContent = `${booksRead}`;

// Logic to add new books

function displayBook(bookObject) {
    const name = bookObject.title;
    const author = bookObject.author;
    const pages = bookObject.pages;
    const read = bookObject.read;
    const index = myLibrary.indexOf(bookObject);


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
    removeHTML.addEventListener("click", (e) => {
        const card = e.target.closest(".card");
        card.remove();
        if ( myLibrary[index].read === true) readBooks.textContent = `${--booksRead}`
        myLibrary.splice(index, 1);
        totalBooks.textContent = `${myLibrary.length}`
    })

    const checkboxHTML = document.createElement("input");
    checkboxHTML.setAttribute("type", "checkbox");
    checkboxHTML.setAttribute("class", "book-status");
    if (read) {
        checkboxHTML.checked = true;
    }
    checkboxHTML.addEventListener("change", (e) => {
        bookObject.read = bookObject.read === true ? false : true;
        readBooks.textContent = bookObject.read ? `${++booksRead}` : `${--booksRead}`;
    })
    

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

const addButton = document.querySelector(".add-book");
const formElement = document.querySelector(".add-book-form");

addButton.addEventListener("click", () => {
    formElement.classList.toggle("hide")
})

const submitButton = document.querySelector(".submit-book");

submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const newTitle = document.getElementById("title").value;
    const newAuthor = document.getElementById("author").value;
    const newPages = document.getElementById("pages").value;
    const newStatus = (document.getElementById("read").checked === true ? true : false);

    const newBook = new Book(newTitle, newAuthor, newPages, newStatus);

    addBookToLibrary(newBook);
    displayBook(newBook);

    totalBooks.textContent = `${myLibrary.length}`;
    if (newStatus === true) readBooks.textContent = `${++booksRead}`;
    formElement.classList.toggle("hide")
});