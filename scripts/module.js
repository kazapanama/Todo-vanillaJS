import { formatMaxWidth,formatCategory } from "./utils.js"


//GENERAL FUNCTIONS SECTION
export async function getData(){
   const response = await fetch('./mockData.json')
   const data = await response.json()
   return data
}
        
export function filterData(data){
    const activeTodos = data.filter(item=>item.isArchive === false)
    const archiveTodos = data.filter(item=>item.isArchive === true)
    return [activeTodos,archiveTodos]
}

export function createTodo(item,node,type='active'){
    const todo = document.createElement('div')
    todo.classList.add('item')

    let {name, createdAt, category,dates,isArchive,id,content} = item

    todo.innerHTML = `
        <span class="name">${formatMaxWidth(name)}</span>
        <span class="date-created">${createdAt}</span>
        <div class="formater">
            <span>${formatCategory(category)}</span>
        </div>
        <span class="active-content">${formatMaxWidth(content)}</span>
        <div class="formater">
        <span class="date-found">${dates}</span>

            
        </div>
        <div class="icons">
            
        </div>
    `
    if (type === 'active'){
        todo.lastElementChild.innerHTML = `
        <img class="active-icon" data-action="edit" src="./img/edit.svg">
        <img class="active-icon" data-action="archive" src="./img/archive.svg">
        <img class="active-icon" data-action="delete" src="./img/delete.svg">
        `

    }

    if (type === 'archive'){
        todo.lastElementChild.innerHTML = `
        <img class="active-icon" data-action="edit" src="./img/edit.svg">
        <img class="active-icon" data-action="delete" src="./img/delete.svg">
        `
    }


    todo.id = id


    

    let icons = Array.from(todo.lastElementChild.children)
    
//ADDING LISTENERS FOR BUTTONS
    icons.forEach(item=>{
        
        if (item.dataset.action ==='delete'){
            item.addEventListener('click',()=>{
                todo.remove() 
                })
        }

        if (item.dataset.action ==='edit'){
            // item.addEventListener('click',()=>todo.remove())
        }

        if (item.dataset.action ==='archive'){
            // item.addEventListener('click',()=>todo.remove())
        }
        
        
        
        item.addEventListener('click',()=>console.log(todo.id+' - '+item.dataset.action)) 
        
     })
    
    node.appendChild(todo)
}




//ACTIVE SECTION FUNCTIONS
export function renderActive(todos,node){
    todos.forEach(item=>createTodo(item,node,'active'))
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

export function renderSummary(allTodos,node){
    const summaryCategories = getSummaryIfno(allTodos)
    renderSummaryItems(summaryCategories,node)
}


//ARCHIVE SECTION FUNCTIONS
export function renderArchive(archiveTodos,node){
    archiveTodos.forEach(item=>{
        createTodo(item,node,'archive')

    })
}