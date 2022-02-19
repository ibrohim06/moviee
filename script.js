const API_KEY = `259c54c53e1db75ca5c5abe2e40a02d0`

const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=2`

const IMG_PATH = `	https://www.themoviedb.org/t/p/w220_and_h330_face` 

const SEARCH_ITEM = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query=`

const form = document.querySelector('.header__nav-form')
const input = document.querySelector('.header__nav-search')
const main = document.querySelector('.main')
const mainbtn = document.querySelector('.main__btn')

async function getFilms (url) {
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(item => {
                const el = document.createElement('div')
                const img = document.createElement('img')
                const text = document.createElement('h2')

                text.innerHTML = item.original_title
                img.src = IMG_PATH + item.poster_path
                el.appendChild(img)
                el.appendChild(text)

                main.appendChild(el)
            })
        })
}

getFilms(API_URL)

form.addEventListener('submit', (e) => {  //submit - обрабатывает enter
    e.preventDefault()

    main.innerHTML = ""

    const value = input.value

    if (value) {
        getFilms(SEARCH_ITEM + value)
        input.value = ''
    }
})




let page = 1

mainbtn.addEventListener('click', ( ) => {
    page++
    getFilms(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`)
})


