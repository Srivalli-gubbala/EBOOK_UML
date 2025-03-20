// eBook data array (example)
let books = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", description: "A classic novel set in the 1920s.", available: true },
    { title: "1984", author: "George Orwell", description: "A dystopian novel about totalitarianism.", available: false },
    { title: "Moby Dick", author: "Herman Melville", description: "The narrative of Captain Ahab's obsessive quest.", available: true },
    { title: "Pride and Prejudice", author: "Jane Austen", description: "A romantic novel of manners.", available: true },
];

const searchInput = document.getElementById('searchInput');
const bookList = document.getElementById('bookList');
const logoutBtn = document.getElementById('logoutBtn');

// Modal elements for ordering
const orderModal = document.getElementById('orderModal');
const submitOrderBtn = document.getElementById('submitOrderBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const usernameInput = document.getElementById('username');
const addressInput = document.getElementById('address');

// Render books in the list
function renderBooks(filteredBooks = books) {
    bookList.innerHTML = '';
    filteredBooks.forEach(book => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Description:</strong> ${book.description || 'No description available'}</p>
            <button onclick="downloadBook('${book.title}')">
                Download
            </button>
            <button onclick="orderBook('${book.title}')">
                Order
            </button>
        `;
        bookList.appendChild(li);
    });
}

// Filter books based on search input
function filterBooks() {
    const searchQuery = searchInput.value.toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery)
    );
    renderBooks(filteredBooks);
}

// Handle download action
function downloadBook(title) {
    const book = books.find(book => book.title === title);
    if (book.available) {
        alert(`Downloading "${book.title}"...`);
    } else {
        alert(`"${book.title}" is not available for download. Please order it.`);
    }
}

// Handle order action
function orderBook(title) {
    const book = books.find(book => book.title === title);
    // Show order modal for any book
    orderModal.style.display = 'block';
    submitOrderBtn.onclick = function() {
        const username = usernameInput.value;
        const address = addressInput.value;
        if (username && address) {
            alert(`Order for "${book.title}" placed successfully! It will be delivered to ${address}.`);
            orderModal.style.display = 'none'; // Close the modal
            // Reset the form
            usernameInput.value = '';
            addressInput.value = '';
        } else {
            alert('Please fill in both username and address.');
        }
    };
}

// Event listener for search input
searchInput.addEventListener('input', filterBooks);

// Logout functionality
logoutBtn.addEventListener('click', function() {
    window.location.href = "login.html";  // Redirect back to login page
});

// Close the order modal without submitting
closeModalBtn.addEventListener('click', function() {
    orderModal.style.display = 'none';  // Close the modal
});

// Initial render
renderBooks();
