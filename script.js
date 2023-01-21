const submit = document.getElementById('submit')
const add = document.getElementById('add')
let welcome = document.getElementById('welcome')
const register = document.getElementById('register')
const newTask = document.getElementById('new')
const addSection = document.getElementById('addSection')


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
            welcome.innerHTML = 'Welcome ' + username
            setTimeout(() => {
                register.style.display = 'none'
            }, 1500);
        } 
    }
} else{
    let username = localStorage.getItem('username')
    welcome.innerHTML = 'Welcome ' + username
}

submit.onclick = () => {
    let text = add.value
    localStorage.setItem(Number(maxStorage()) + 1, text)
    refresh()
    add.value = ''
}

function maxStorage(){
    max = 1
    for (let a = 0; a < localStorage.length; a++){
        if (localStorage.key(a) !== 'username'){
            if (Number(localStorage.key(a)) > max){
                max = localStorage.key(a)
            }
        }
    }
    return max
}

refresh()

function refresh(){
    remove(document.getElementById('list'))
    for (let i = 1; i <= Number(maxStorage()); i++){
        if (localStorage.getItem(i) !== null){
            n = true
            let element = document.createElement('input')
            element.type = 'checkbox'
            element.id = 'el' + i.toString()
            let label = document.createElement('td')
            label.innerText = localStorage.getItem(i)
            let row = document.createElement('tr')
            row.id = 'row' + i.toString()
            document.getElementById('list').appendChild(row)
            document.getElementById('row' + i.toString()).appendChild(element)
            document.getElementById('row' + i.toString()).appendChild(label)
    
            element.addEventListener('click', () => {
                row.classList.add('checked')
                setTimeout(() => {
                    row.style.display = 'none'
                    finished()
                }, 1000);
                localStorage.removeItem(i)
            })
        }
    }
    finished()
}

function finished(){
    if (localStorage.length < 2){
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


