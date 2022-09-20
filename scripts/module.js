import { formatMaxWidth } from "./utils.js"

export async function getData(){
   const response = await fetch('./mockData.json')
   const data = await response.json()
   return data
}
        

export function createTodo(item,node){
    const todo = document.createElement('div')
    todo.classList.add('item')

    let {name, createdAt, category,dates,isArchive,id,content} = item

    todo.innerHTML = `
        <span class="active-name">${formatMaxWidth(name)}</span>
        <span class="active-date">${createdAt}</span>
        <div class="active-div-formater">
            <span>${category}</span>
        </div>
        <span class="active-content">${formatMaxWidth(content)}</span>
        <div class="active-div-formater">
        <span>${dates}</span>

            
        </div>
        <div class="active-icons">
            <img class="active-icon" data-action="edit" src="./img/edit.svg">
            <img class="active-icon" data-action="archive" src="./img/archive.svg">
            <img class="active-icon" data-action="delete" src="./img/delete.svg">
        </div>
    `

    todo.id = id

    // todo.addEventListener('click',e=>console.log(e.target.id))
    

    let icons = Array.from(todo.lastElementChild.children)
    
    // icons[2].addEventListener('click',removeTodo(id,db,activeSection))

    icons.forEach(item=>{
       item.addEventListener('click',()=>console.log(todo.id+' - '+item.dataset.action)) 
    })
  
    node.appendChild(todo)
}

export function filterTodo(id,db){
    return db.filter(item=>item.id !== id)
}

export function removeTodo(id,db,node){
    db = fillterTodo(id,db)
    db.forEach(item=>createTodo(item,node))
}





export function showForm(node){
    node.parentNode.style.display = 'flex'
    document.body.style.overflow = 'hidden'
    
    node.parentNode.addEventListener('click',e=>{
        if (e.target == node.parentNode){
            hideForm(node)
        }
    })
}

export function hideForm(node){
    node.parentNode.style.display = 'none'
    document.body.style.overflow = ''
}