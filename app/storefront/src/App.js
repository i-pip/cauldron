import React, {useEffect, useState} from 'react'
import './App.css';

const BOOKS_ENDPOINT = "catalog/Books";

function App() {
  return (
    <div className="App">
      <header >
        Storefront
      </header>
      <Books />
    </div>
  );
}

function Books(){
    const [books, setBooks] = useState([])

    useEffect(() => {
        async function updateBooks() {
            setBooks(await fetchBooks());
        }

        updateBooks()
    }, [])

    return (
        <ul>
            <li>{books.map(book => <li key={book.ID}>{book.title}</li>)}</li>
        </ul>
    )
}

async function fetchBooks(){
    const response = await fetch(BOOKS_ENDPOINT);
    const books = await response.json();
    return books.value
}

export default App;
