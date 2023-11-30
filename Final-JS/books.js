let db;
fetch('./books.json').then((response) => response.json()).then(booksRes => {

  console.log('Books data', booksRes);
  init(booksRes);



  document.getElementById('card-details').innerHTML = booksRes.map(book =>
    `<div class="card">
        <div class="book">
        <img class="picture" src=${book.imageLink} alt="Avatar" >
        <div class="book-details">
        <h2>${book.title}</h2>
        <div class="author">Author:&nbsp;<div class="author-name">${book.author}</div></div>

        </div>
        <div>
          <div class="progress">
            <div class="progress-bar" id="${book.title}" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
              <span></span>
            </div>
          </div>

          <div class="btn">
            <button class="dir" id="voteUp-${book.title}">Vote-up</button>
            <button class="dir" id="voteDown-${book.title}">Vote-down</button>
        </div>            
        </div>
        </div>`
  ).join('');

  booksRes.forEach((value) => {
    let voteUpButton = document.getElementById(`voteUp-${value.title}`);

    voteUpButton.addEventListener("click", (e) => {
      voteUpdate(value.title, 'voteUp')
    });

    let voteDownButton = document.getElementById(`voteDown-${value.title}`);

    voteDownButton.addEventListener("click", (e) => {
      voteUpdate(value.title, 'voteDown')
    });
  })


}).catch((err) => {
  alert("Something went wrong when json fetch from json")
});

async function voteUpdate(title, type) {
  const request = await indexedDB.open('bookDB', 1);

  request.onsuccess = function (event) {
    const db = event.target.result;

    let tx = db.transaction('books', 'readwrite');
    const objectStore = tx.objectStore('books');
    const getAllRequest = objectStore.getAll();
    getAllRequest.onsuccess = async function (event) {
      const storedBooks = event.target.result;
      const booksData = storedBooks.map((val) => {
        if (val.title === title) {
          if (type === 'voteUp') {
            val.voteUp = val.voteUp + 1,
              val.totalVote = val.voteUp - val.voteDown
          } else {
            val.voteDown = val.voteDown + 1,
              val.totalVote = val.voteUp - val.voteDown
          }
        }
        return val;
      })
      const book = booksData.filter((val) => val.title === title);
      const updateRequest = objectStore.put(book[0]);


      // Handle successful update
      updateRequest.onsuccess = function () {
        // Update progress bar based on stored votes
        updateProgressBar(booksData);
      };
    }
  }
}

function updateProgressBar(bookArray) {
  // Find the maximum vote count among all rows
  const voteArray = [];
  bookArray.forEach((val) => {
    voteArray.push(val.totalVote || 0);
  })
  const maxVotes = Math.max(...Object.values(voteArray)) > 0 ? Math.max(...Object.values(voteArray)) : 0;

  // Update the progress bar for each row based on the percentage of max votes
  bookArray.forEach((val) => {
    const progressBar = document.getElementById(val.title);
    const percentage = ((val.totalVote || 0) / maxVotes) * 100;

    progressBar.style.width = `${percentage.toFixed(2)}%`; // Display the percentage in the progress bar
    progressBar.children[0].innerHTML = `${percentage.toFixed(2)}% Votes`;
  });
}


async function init(booksRes) {
  // Open the IndexDB database
  const request = await indexedDB.open('bookDB', 1);

  request.onupgradeneeded = function (event) {
    const db = event.target.result;

    // Create an object store to store vote counts
    const objectStore = db.createObjectStore('books', { keyPath: 'title' });

    // Create an index to quickly retrieve vote counts
    // objectStore.createIndex('voteUp', 'voteUp', { unique: false });
    // objectStore.createIndex('voteDown', 'voteDown', { unique: false });

  };

  request.onsuccess = function (event) {
    const db = event.target.result;

    let tx = db.transaction('books', 'readwrite');

    try {
      booksRes.forEach(function (data) {
        tx.objectStore('books').add(data);
      });
      initVote();
    } catch (err) {
      throw err;
    }
  }
}

async function initVote() {
  const request = await indexedDB.open('bookDB', 1);

  request.onsuccess = function (event) {
    const db = event.target.result;

    let tx = db.transaction('books', 'readonly');
    const objectStore = tx.objectStore('books');
    const getAllRequest = objectStore.getAll();
    getAllRequest.onsuccess = async function (event) {
      const storedBooks = event.target.result;
      // Update progress bar based on stored votes
      updateProgressBar(storedBooks);
    }
  }
}

window.addEventListener('unhandledrejection', event => {
  alert("Error: " + event.reason.message);
});



