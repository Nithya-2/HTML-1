fetch('./books.json').then((response) => response.json()).then(booksRes => {
    
    console.log('Books data', booksRes);

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
            <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:70%">
              <span class="sr-only">70% Votes</span>
            </div>
          </div>

          <div class="btn">
            <button class="dir">Vote-up</button>
            <button class="dir">Vote-down</button>
            <button class="dir">Delete</button></div>
        </div>            
        </div>
        </div>`
    ).join('')

}).catch((err) => {
    alert("Something wen wrong when json fetch from json")
})