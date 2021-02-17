const content = document.querySelector(".qoutes-content");
const author = document.querySelector(".qoutes-author");
fetch('http://localhost:3000/qoutes').then((res, error) => {
  res.json().then((data) => {
    content.textContent = '" ' + data.content + ' "';
    author.textContent = '- ' + data.author;
  })
});