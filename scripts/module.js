import { formatMaxWidth,formatCategory } from "./utils.js"


export async function getData(){
   const response = await fetch('./mockData.json')
   const data = await response.json()
   return data
}
        
//ACTIVE SECTION FUNCTIONS

export function createTodo(item,node){
    const todo = document.createElement('div')
    todo.classList.add('item')

    let {name, createdAt, category,dates,isArchive,id,content} = item

    todo.innerHTML = `
        <span class="active-name">${formatMaxWidth(name)}</span>
        <span class="active-date-created">${createdAt}</span>
        <div class="active-div-formater">
            <span>${formatCategory(category)}</span>
        </div>
        <span class="active-content">${formatMaxWidth(content)}</span>
        <div class="active-div-formater">
        <span class="active-date-found">${dates}</span>

            
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



//FORM FUNCTIONS

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


//SUMMARY SECTION FUNCTIONS
export function getSummaryIfno(allTodos){

    //get list of unique categories
    let listOfCategories =Array.from(new Set(allTodos.map(item=>item.category))) 
    
    //mock for return object
    let categoriesTree = {}
    
    //filling mock with categories, and setting initial values as 0
    listOfCategories.forEach(category=>{
      categoriesTree[category]= {
      active:0,
      archive:0
      }
    })
    
    //filling mock with data
    allTodos.forEach(item=>{
        categoriesTree[item.category][!item.isArchive ? 'active' : 'archive'] +=1 
        
      })
      
      
      
      return categoriesTree
    }

export function renderSummaryItems(summaryCategories,node){
    node.innerHTML = ''
    for (let key in summaryCategories){
        let div = document.createElement('div')
    
        div.innerHTML = `
        <div class="sumary-item">
            <span>${formatCategory(key)}</span>
        
            <div>
                <span>${summaryCategories[key]['active']}</span>
                <span>${summaryCategories[key]['archive']}</span>
            </div>
            
        </div>
        `
        node.appendChild(div)
    }
    
}

export function renderSummary(allTodos,summarySection){
    const summaryCategories = getSummaryIfno(allTodos)
    renderSummaryItems(summaryCategories,summarySection)
}