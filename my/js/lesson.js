// PHONE BLOCK 

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneSpan = document.querySelector('#phone_span')

const regExp = /\+996 [2579]\d{2}-\d{2}-\d{2}-\d{2}/

phoneButton.onclick = () => {
    if (regExp) {
         
    }
}

// const tapContentBlocks = document.querySelector('.tab_content_block')

// const hidetTapContentBlocks = () => {
//     tapContentBlocks.forEach((item) => {
//         item.style.display = 'none'
//     })
// }
const tabContentItems = document.querySelectorAll('.tab_content_block')
const tabItems = document.querySelectorAll('.tab_content_item')
const tabItemsParent = document.querySelector('.tab_content_items')
const hideTabContent = () => {
    tabContentItems.forEach((item) => {
        item.style.display = 'none'
    })
    tabItems.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index = 0) => {
    tabContentItems[index].style.display = 'block'
    tabItems[index].classList.add('tab_content_item_active')
}
hideTabContent()
showTabContent()

tabItemsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabItems.forEach((tabItem, tabIndex) => {
            if (event.target === tabItem) {
                hideTabContent()
                showTabContent(tabIndex)
            }
        })
    }
}
const auto = (index = 0) => {
    setInterval(() => {
        index++
        if(index >= tabItems.length){
            index = 0
        }
        hideTabContent()
        showTabContent(index)
    }, 3000);
}
auto()
//converter
const somInput = document.querySelector("#som")
const usdInput = document.querySelector("#usd")
const eurInput = document.querySelector("#eur")

// somInput.addEventListener("input", () => {
//     const request = new XMLHttpRequest()
//     request.open("GET","../data/converter.json")
//     request.setRequestHeader("Content-type","application/json")
//     request.send()

//     request.onload = () => {
//         const data = JSON.parse(request.response)
//         input.value = (somInput.value / data.usd).toFixed(2)
        
//     }
// })
//kiss - keep it simple, stupid - делай проще идиот

const converter = (element, targetElement) => {
    element.oninput = () => {
        const request = new XMLHttpRequest()
        request.open("GET","../data/converter.json")
        request.setRequestHeader("Content-type","application/json")
        request.send()

        request.onload = () => {
            const data = JSON.parse(request.response)
            if (element.id === "som"){
                targetElement.value = (element.value / data.usd).toFixed(2)
            }
            if (element.id === "usd"){
                targetElement.value = (element.value * data.usd).toFixed(2)
            }
            
            if (element.id === "euro"){
                targetElement.value = (element.value - data.usd).toFixed(2)
            }

            if (element.value === ""){
                targetElement.value = "", ""
            }
        }
    }
    
}
converter(somInput, eurInput)
converter(somInput, usdInput)
converter(usdInput, somInput)
converter(usdInput, eurInput)
converter(eurInput, usdInput)
converter(eurInput, somInput)


//CARDSWITCHER

const cardBlock = document.querySelector(".card")
const btnNext = document.querySelector("#btn-next")
const btnPrev = document.querySelector("#btn-prev")
let cardId = 1

function request (){
    fetch(`https://jsonplaceholder.typicode.com/todos/${cardId}`)
    .then(response => response.json())
    .then(data => {
        cardBlock.innerHTML = `
        <p>${data.title}</p>
        <p style>${data.completed}</p>
        <span>${data.id}</span>
        `
        
    })
}
request()
btnNext.onclick = () => {
    
    cardId++
    if(cardId >= 200){
        cardId = 1
    }
    request()
}
btnPrev.onclick = () => {
    cardId--
    if(cardId < 1){
        cardId = 200
    }
    request()
}

const link = 'https://jsonplaceholder.typicode.com/posts'
function requestLink (){
    fetch(link)
    .then(response => response.json())
    .then(data => console.log(data));
    
}
requestLink()