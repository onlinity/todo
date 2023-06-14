const submit = document.getElementById('submit')
const add = document.getElementById('add')
let welcome = document.getElementById('welcome')
const register = document.getElementById('register')
const newTask = document.getElementById('new')
const addSection = document.getElementById('addSection')

welcome.addEventListener('input', adjustWidth)

welcome.onblur = () => {
    localStorage.removeItem('username')
    localStorage.setItem('username', welcome.value)
    welcome.value = localStorage.getItem('username')
}

newTask.onclick = () => {
    addSection.classList.toggle('display')
}

if (localStorage.getItem('username') == null){
    register.style.display = 'block'
    let button = document.getElementById('continue')
    button.onclick = () => {
        let input = document.getElementById('username').value
        if (input != ''){
            localStorage.setItem('username', input)
            register.classList.add('closed')
            let username = localStorage.getItem('username')
            welcome.value = username
            adjustWidth()
            setTimeout(() => {
                register.style.display = 'none'
            }, 1500);
        } 
    }
} else{
    let username = localStorage.getItem('username')
    welcome.value = username
    adjustWidth()
}

submit.onclick = () => {
    let text = add.value
    localStorage.setItem(Number(maxStorage()) + 1, text)
    refresh()
    newTask.click()
    add.value = ''
}

function preventDefault(e){
    e.preventDefault()
}

function adjustWidth() {
    var value = welcome.value;
    var width = value.length * 16; // 8px per character
    welcome.style.width = width + "px";
}

function maxStorage(){
    max = 1
    for (let a = 0; a < localStorage.length; a++){
        if (localStorage.key(a) !== 'username' && localStorage.key(a).includes('-finished') == false){
            if (Number(localStorage.key(a)) > max){
                max = localStorage.key(a)
            }
        }
        else if (localStorage.key(a) !== 'username' && localStorage.key(a).includes('-finished')){
            if (Number(localStorage.key(a).replace('-finished', '')) > max){
                max = Number(localStorage.key(a).replace('-finished', ''))
            }
        }
    }
    return max
}

refresh()
refreshFinished()

function refresh(){
    remove(document.getElementById('list'))
    for (let i = 0; i <= Number(maxStorage()); i++){
        if (localStorage.getItem(i) !== null){
            n = true
            let element = document.createElement('input')
            element.type = 'checkbox'
            element.id = 'el' + i.toString()
            let label = document.createElement('td')
            label.id = 'tableData' + i.toString()
            let input = document.createElement('textarea')
            label.appendChild(input)
            input.onblur = () => {
                localStorage.removeItem(i)
                localStorage.setItem(i, input.value)
                input.value = localStorage.getItem(i)
            }
            input.value = localStorage.getItem(i)
            let row = document.createElement('tr')
            row.id = 'row' + i.toString()
            document.getElementById('list').appendChild(row)
            document.getElementById('row' + i.toString()).appendChild(element)
            document.getElementById('row' + i.toString()).appendChild(label)
    
            element.addEventListener('click', () => {
                row.classList.add('checked')
                setTimeout(() => {
                    row.style.display = 'none'
                }, 1000);
                let date = new Date()
                let finishedValue = localStorage.getItem(i) + ' (' + date.getDate() + '. ' + date.getMonth() + '. ' + date.getFullYear()+ '.'+ ')'
                let finishedKey = i.toString() + '-finished'
                localStorage.removeItem(i)
                localStorage.setItem(finishedKey, finishedValue)
                refreshFinished()
                finished()
            })
        }
    }
    finished()
}




function refreshFinished(){
    remove(document.getElementById('finishedTasksList'))
    for (let i = 0; i <= localStorage.length; i++){
        let key = localStorage.key(i)
        if (localStorage.getItem(key) !== null && key.includes('-finished')){
            let element = document.createElement('li')
            element.innerHTML = localStorage.getItem(key)
            document.getElementById('finishedTasksList').appendChild(element)
        }
    }
    if (document.getElementById('finishedTasksList').innerHTML == ''){
        document.getElementById('finishedTasks').style.display = 'none'
    } else{
        document.getElementById('finishedTasks').style.display = 'block'
    }
}



function allFinished(){
    r = true
    for (let i = 0; i < localStorage.length; i++){
        if (localStorage.key(i) !== 'username' && localStorage.key(i).includes('-finished') == false){
            r = false
        }
    }
    return r
}



function finished(){
    if (allFinished()){
        document.getElementById('finished').style.display = 'flex'
    } else{
        document.getElementById('finished').style.display = 'none'
    }
}




function remove(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


document.getElementById('add').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      document.getElementById("submit").click();
    }
  });


