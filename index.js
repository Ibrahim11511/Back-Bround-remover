const addCard = document.querySelector('#addCard')
const displayImage = document.querySelector('#displayImage')
const loadingCard = document.querySelector('#loadingCard')
const downloadCard = document.querySelector('#downloadCard')
const fileInput = document.querySelector('.file-input')
const imageBefore = document.querySelector('#displayImage img')
const startBtn = document.querySelector('.start')
const imageRemovedBG = document.querySelector('.imageRemovedBG')
const downloadBtn = document.querySelector('.download a')
const uploadAnother = document.querySelector('.uploadAnother')

const formData = new FormData()
let reader = new FileReader()
const API_URL = 'https://api.remove.bg/v1.0/removebg'
const API_KEY = '3HJ9QXhuskvuaySggVZxhwuL'
let file

displayScrean(addCard)

function displayScrean(screan) {
    addCard.style.display = 'none'
    displayImage.style.display = 'none'
    loadingCard.style.display = 'none'
    downloadCard.style.display = 'none'
    screan.style.display = 'flex'
}

fileInput.addEventListener('input', () => {
    file = fileInput.files[0]
    reader.readAsDataURL(file)
    reader.addEventListener('load', () => {
        imageBefore.src = reader.result
    })
    displayScrean(displayImage)
})

startBtn.addEventListener('click', () => {
    formData.append('image_file', file)
    displayScrean(loadingCard)
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'X-Api-Key': API_KEY
        },
        body: formData,
    })
        .then(res => res.blob())
        .then(data => {
            reader.readAsDataURL(data)
            reader.addEventListener('load', () => {
                imageRemovedBG.src = reader.result
                downloadBtn.href = reader.result
            })
            displayScrean(downloadCard)
        })
})

uploadAnother.addEventListener('click', () => {
    window.location.reload()
})