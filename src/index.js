import $ from 'jquery'

const getTopWord = () => {
  $('.word-count').html('')
  fetch('https://wordwatch-api.herokuapp.com/api/v1/top_word')
    .then((response) => response.json())
    .then((rawWord) => appendTopWord(rawWord))
    .catch((error) => console.error({ error }));
}

const appendTopWord = (data) => {
  $('.word-count').append(`
    ${Object.keys(data["word"])[0]}: ${Object.values(data["word"])[0]}
  `)
}

const addNewWord = () => {
  let word = $('#wordField').val();
  fetch('https://wordwatch-api.herokuapp.com/api/v1/words', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      word: { value: `${word}` }
    })
  })
  getTopWord();
  $('#wordField').val('')
}

getTopWord();

$('#break-btn').on('click', addNewWord);