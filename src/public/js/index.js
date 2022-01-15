let list = document.querySelector('.compose-sideBar')
let myList = document.querySelector('.sideBar')
let input = document.querySelector('textarea')
let madalOyna = document.querySelector('.side-two')
let MyPhoto = document.querySelector('.heading-avatar-icon img')
let profilePhoto = document.querySelector('.conversation .heading-avatar .heading-avatar-icon img')
let profileName = document.querySelector('.heading-name .heading-name-meta')
let users = []
let chat = []

;(async()=>{
    const My = await request("/users", "POST")
    MyPhoto.src = backendApi + My.profilImg
})()

;(async()=>{
    users =  await  request('/users')
    chats = await  request('/users/my')
})()

async function renderUsers(){
    if (!(users.length)) users =  await  request('/users')
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
            madalOyna.style="left: -100%;"
        }
    });
}

async function renderMyUsers(){
    if (!(users.length)) users =  await  request('/users')
    let myUser = await  request('/users/my')
    let userlar = []
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
        }   
    });
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


renderUsers()   
renderMyUsers()