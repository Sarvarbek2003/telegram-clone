let list = document.querySelector('.compose-sideBar')
let myList = document.querySelector('.sideBar')
let input = document.querySelector('textarea')
let users = []
let chat = []

;(async()=>{
    users =  await  request('/users')
    chat = await  request('/users/my')
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
    });
}

async function renderMyUsers(){
    if (!(users.length)) users =  await  request('/users')
    let myUser = await  request('/users/my')
    let userlar = []
    users.filter(myuser => {
        return myUser.map(user => {
            if(user.userId == myuser.userId){
                user.message.map(el => myuser.time = el.time)
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
                <span class="name-meta">${user.username}
                </span>
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
            renderChat(user.userId)
        }   
    });
}


async function renderChat(id){
    input.removeAttribute('disabled','disabled')
    
}


renderUsers()
renderMyUsers()