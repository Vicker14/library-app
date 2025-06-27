//============
// CLASS ZONE
//============
class Book {
    
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    markAsRead() {
        this.status = true;
    }
    markAsNotRead() {
        this.status = false;
    }
}

class Library {

    constructor() {
        this.inventory = [];
    }

    addBook(newBook) {
        this.inventory.push(newBook);
    }

    get getReadBooks() {
        let readBooks = 0;
        for(let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i].status === true) readBooks++;
        }
        return readBooks;
    }
    get getTotalBooks() {
        return this.inventory.length;
    }
}

class DisplayControler {

    static updateCounter() {
        document.querySelector(".read").textContent = `${myLibrary.getReadBooks}`;
        document.querySelector(".total").textContent = `${myLibrary.getTotalBooks}`;
    }

    static displayBook(book) {

        // Add the information about the book
        const info = document.createElement("div");
        
        const name = document.createElement("div");
        name.setAttribute("class", "book-name");
        name.textContent = book.title;

        const author = document.createElement("div");
        author.setAttribute("class", "book-author");
        author.textContent = book.author;

        const pages = document.createElement("div");
        pages.setAttribute("class", "book-pages");
        pages.textContent = book.pages;

        info.append(name, author, pages);


        // Add controls of the book status
        const controls = document.createElement("div");
        controls.setAttribute("class", "controls");

        const remove = document.createElement("button");
        remove.setAttribute("class", "remove-book");
        remove.textContent = "remove";
        remove.addEventListener("click", (e) => {
            const card = e.target.closest(".card");
            card.remove();
            myLibrary.inventory.splice(myLibrary.inventory.indexOf(book), 1);
            this.updateCounter();
        });

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("class", "book-status");
        checkbox.checked = book.status;
        checkbox.addEventListener("change", () => {
            book.status = book.status === true ? false : true;
            this.updateCounter();
        })

        controls.append(remove, checkbox);


        // Display the book
        const card = document.createElement("div");
        card.setAttribute("class", "card");
        
        card.append(info, controls);

        const container = document.querySelector(".container");
        container.insertBefore(card, container.firstChild);
    }

}
//=====================
// EVENT LISTENER & PRELOAD ZONE
//=====================
const myLibrary = new Library();
DisplayControler.updateCounter(myLibrary);

const addNewButton = document.querySelector(".add-book");
const addNewForm = document.querySelector(".add-book-form");
const submitButton = document.querySelector(".submit-book");

addNewButton.addEventListener("click", () => {
    addNewForm.classList.toggle("hide");
});

submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const newTitle = document.getElementById("title").value;
    const newAuthor = document.getElementById("author").value;
    const newPages = document.getElementById("pages").value;
    const newStatus = (document.getElementById("read").checked === true ? true : false);

    const newBook = new Book(newTitle, newAuthor, newPages, newStatus);
    myLibrary.addBook(newBook);
    DisplayControler.displayBook(newBook);
    DisplayControler.updateCounter();
    addNewForm.classList.toggle("hide");
})
/*-----------
// TEST ZONE
//-----------
const theHobbit = new Book('The Hobbit', 'Tolkien', 295, false);
const gameOfThrones = new Book('Game of Thrones', 'George R.R. Martin', 1543, true);

myLibrary.addBook(theHobbit);
myLibrary.addBook(gameOfThrones);

for (let book of myLibrary.inventory) {
    DisplayControler.displayBook(book);
}
*/