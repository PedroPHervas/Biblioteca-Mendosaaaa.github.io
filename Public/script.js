const baseUrl = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
    loadBooks();

    // Manejar el formulario de añadir libro
    const addBookForm = document.getElementById('addBookForm');
    addBookForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const bookData = {
            autor: document.getElementById('autor').value,
            titulo: document.getElementById('titulo').value,
            genero: document.getElementById('genero').value,
            puerta: document.getElementById('puerta').value,
            balda: document.getElementById('balda').value,
        };

        await fetch(`${baseUrl}/libros`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData),
        });

        addBookForm.reset();
        loadBooks();
    });
});

// Cargar libros
async function loadBooks() {
    const res = await fetch(`${baseUrl}/libros`);
    const books = await res.json();

    const booksTable = document.getElementById('booksTable');
    booksTable.innerHTML = books.map(book => `
        <tr>
            <td>${book.id}</td>
            <td>${book.autor}</td>
            <td>${book.titulo}</td>
            <td>${book.genero}</td>
            <td>${book.puerta}</td>
            <td>${book.balda}</td>
        </tr>
    `).join('');
}

// Filtrar libros
function filterBooks() {
    const query = document.getElementById('searchBox').value.toLowerCase();
    const rows = document.querySelectorAll('#booksTable tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const match = [...cells].some(cell => cell.textContent.toLowerCase().includes(query));
        row.style.display = match ? '' : 'none';
    });
}
