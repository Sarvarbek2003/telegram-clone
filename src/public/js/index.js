let list = document.querySelector('.compose-sideBar')
let myList = document.querySelector('.sideBar')
let input = document.querySelector('textarea')
let send = document.querySelector('.reply-send')
let madalOyna = document.querySelector('.side-two')
let MyPhoto = document.querySelector('.heading-avatar-icon img')
let profilePhoto = document.querySelector('.conversation .heading-avatar .heading-avatar-icon img')
let profileName = document.querySelector('.heading-name .heading-name-meta')

let users = []
let chat = []
let chats = []
let chat_id;


;(async()=>{
    const My = await request("/users", "POST")
    MyPhoto.src = backendApi + My.profilImg
})()


async function reqq(){
    users = []
    chats = []
    users =  await  request('/users')
    chats = await  request('/users/my')
}
reqq()
async function renderUsers(arg){
    // if (!(users.length)) users =  await  request('/users')
    if(!arg){
        list.innerHTML = null
        users.map(user => {
            let divv = document.createElement('div')
            divv.setAttribute('class','row sideBar-body')   
            divv.innerHTML = `
                <div class="row sideBar-body">
                <div class="col-sm-3 col-xs-3 sideBar-avatar">
                <div class="avatar-icon">
                    <img src=${backendApi+ user.profilImg}>
                </div>
                </div>
                <div class="col-sm-9 col-xs-9 sideBar-main">
                <div class="row">
                    <div class="col-sm-8 col-xs-8 sideBar-name">
                    <span class="name-meta">${user.username}
                    </span>
                    </div>
                </div>
                </div>
            </div>`
            list.append(divv)
            divv.onclick = () =>{
                renderChat(user.userId)
                profilePhoto.src = backendApi+ user.profilImg
                profileName.textContent = user.username
                chat_id = user.userId
                window.localStorage.setItem('userId', user.userId)
                madalOyna.style="left: -100%;"
            }
        });
    } else {
        arg.forEach(user => {
            let divv = document.createElement('div')
            divv.setAttribute('class','row sideBar-body')   
            divv.innerHTML = `
                <div class="row sideBar-body">
                <div class="col-sm-3 col-xs-3 sideBar-avatar">
                <div class="avatar-icon">
                    <img src=${backendApi+ user.profilImg}>
                </div>
                </div>
                <div class="col-sm-9 col-xs-9 sideBar-main">
                <div class="row">
                    <div class="col-sm-8 col-xs-8 sideBar-name">
                    <span class="name-meta">${user.username}
                    </span>
                    </div>
                </div>
                </div>
            </div>`
            list.append(divv)
            divv.onclick = () =>{
                renderChat(user.userId)
                profilePhoto.src = backendApi+ user.profilImg
                profileName.textContent = user.username
                chat_id = user.userId
                window.localStorage.setItem('userId', user.userId)
                madalOyna.style="left: -100%;"
            }
        })
    }
}

let userlar = []
async function renderMyUsers(arg){
    // if (!(users.length)) users =  await  request('/users')
    let myUser = chats
    if(!arg){
        userlar = []
        myList.innerHTML = null
        users.filter(myuser => {
            return myUser.map(user => {
                if(user.userId == myuser.userId){
                    user.message.map(el => {
                        myuser.time = el.time 
                        myuser.text = el.mess
                    })
                    userlar.push(myuser)
                }
            })
        });
        userlar.map(user => {
            let divv = document.createElement('div')
            divv.setAttribute('class','row sideBar-body')   
            divv.innerHTML = `
                <div class="row sideBar-body">
                <div class="col-sm-3 col-xs-3 sideBar-avatar">
                <div class="avatar-icon">
                    <img src="${backendApi+ user.profilImg}">
                </div>
                </div>
                <div class="col-sm-9 col-xs-9 sideBar-main">
                <div class="row">
                    <div class="col-sm-8 col-xs-8 sideBar-name">
                    <span class="name-meta">${user.username}</span>
                    <p class="pp">${user.text}</p>
                    </div>
                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                    <span class="time-meta pull-right">${user.time}
                    </span>
                    </div>
                </div>
                </div>
                </div>`
            myList.append(divv)
            divv.onclick = () => {
                profilePhoto.src = backendApi+ user.profilImg
                profileName.textContent = user.username
                renderChat(user.userId)
                chat_id = user.userId
                window.localStorage.setItem('userId', user.userId)
    
            }   
        });

    } else {
        arg.forEach(user => {
            let divv = document.createElement('div')
            divv.setAttribute('class','row sideBar-body')   
            divv.innerHTML = `
                <div class="row sideBar-body">
                <div class="col-sm-3 col-xs-3 sideBar-avatar">
                <div class="avatar-icon">
                    <img src="${backendApi+ user.profilImg}">
                </div>
                </div>
                <div class="col-sm-9 col-xs-9 sideBar-main">
                <div class="row">
                    <div class="col-sm-8 col-xs-8 sideBar-name">
                    <span class="name-meta">${user.username}</span>
                    <p class="pp">${user.text}</p>
                    </div>
                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                    <span class="time-meta pull-right">${user.time}
                    </span>
                    </div>
                </div>
                </div>
                </div>`
            myList.append(divv)
            divv.onclick = () => {
                profilePhoto.src = backendApi+ user.profilImg
                profileName.textContent = user.username
                renderChat(user.userId)
                chat_id = user.userId
                window.localStorage.setItem('userId', user.userId)
    
            } 
        });
    }
}


async function renderChat(id){
    conversation.innerHTML = null
    input.removeAttribute('disabled','disabled')
    let chat = chats.find(user => user.userId == id)
    if(!chat) return
    chat.message.map(chatt => {
        if(chatt.user){
            const [ div ] = createElements('div')
            div.setAttribute("class", "row message-body")
            div.innerHTML = `
                <div class="col-sm-12 message-main-receiver">
                    <div class="receiver">
                        <div class="message-text">
                            ${chatt.mess}
                        </div>
                        <span class="message-time pull-right">
                            ${chatt.time}
                        </span>
                    </div>
            </div>`
            conversation.append(div)
        }else if(chatt.me){
            const [ div ] = createElements('div')
            div.setAttribute("class", "row message-body")
            div.innerHTML = `
                <div class="col-sm-12 message-main-sender">
                    <div class="sender">
                    <div class="message-text">
                        ${chatt.mess}
                    </div>
                        <span class="message-time pull-right">
                            ${chatt.time}
                        </span>
                    </div>
                </div>`
            conversation.append(div)    
        }
    })
}

send.onclick = async(event) =>{
    event.preventDefault()
    if(!input.value) return
    
    let newMessage = {
        text: input.value,
        userId: window.localStorage.getItem('userId')
    }   
    input.value = null
    chats = await  request('/users/my', 'POST', newMessage)
    renderChat(+(window.localStorage.getItem('userId')))
    conversation.scrollTop = conversation.scrollHeight - conversation.clientHeight;

}


searchText.onkeyup = () =>{
    if(renderTrue)renderTrue = false
    myList.innerHTML = null
    let us = userlar.map(user => {
        if(user.username.toLowerCase().includes(searchText.value.toLowerCase())){
            return user
        }
    })
    if(searchText.value == '') renderTrue = true
    renderMyUsers(us.filter(use => use != undefined))
}

composeText.onkeyup = () =>{
    if(renderTrue)renderTrue = false
    list.innerHTML = null
    let us = users.map(user => {
        if(user.username.toLowerCase().includes(composeText.value.toLowerCase())){
            return user
        }
    })
    if(composeText.value == '') renderTrue = true
    renderUsers(us.filter(use => use != undefined))
}


let renderTrue = true 

setInterval(() => {
if(renderTrue){
    renderUsers() 
    renderMyUsers()
}
}, 1000);




let div = document.querySelector('.message');

conversation.addEventListener('scroll', el => {
    scrolll = false
    if(div.scrollTop > (div.scrollHeight - div.clientHeight)-20) scrolll = true
})

let scrolll = true
setInterval(() => {
    if(scrolll){
        div.scrollTop = div.scrollHeight - div.clientHeight;
    }
}, 500);



setInterval(async() => {
    chats = await  request('/users/my')
    renderChat(chat_id)
}, 2000);




renderUsers()   
renderMyUsers()