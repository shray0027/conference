const content = document.querySelector(".qoutes-content");
const author = document.querySelector(".qoutes-author");
fetch('https://conference-jam.herokuapp.com/qoutes').then((res, error) => {
  res.json().then((data) => {
    content.textContent = '" ' + data.content + ' "';
    author.textContent = '- ' + data.author;
  })
});