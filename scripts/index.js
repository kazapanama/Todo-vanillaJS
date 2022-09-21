import  {getData,createTodo,showForm,hideForm,renderSummary,renderArchive,renderActive,filterData}  from "./module.js";
import { getDate,formatCategory } from "./utils.js";




let allTodos = await getData()

let [activeTodos,archiveTodos] = filterData(allTodos)

//rendering active section
const activeSection = document.querySelector('.active-render')
renderActive(activeTodos,activeSection)     

//rendering  summary section
const summarySection = document.querySelector('.summary-render')
renderSummary(allTodos,summarySection)

//rendering archive section
const archiveSection = document.querySelector('.archive-render')
renderArchive(archiveTodos,archiveSection)

//getting form for adding items
const addForm = document.querySelector('form')
const addBtn = document.querySelector('#btn-add')
addBtn.addEventListener('click',()=>showForm(addForm))

//adding new to-do
addForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    formProps.isArchive = false;
    formProps.id = Math.floor(Math.random()*10000)
    
    formProps.createdAt = getDate()
    formProps.dates = ''

    createTodo(formProps,activeSection,'active')
    allTodos = [...allTodos,formProps]
    renderSummary(allTodos,summarySection)
    
    hideForm(addForm)
    addForm.reset()
    
})




// setting up dynamic listeners for item buttons
document.addEventListener('click',function(e){
    
    if(e.target && e.target.dataset.action== 'delete'){
        
        const todo = allTodos.find(task=>task.id === +e.target.dataset.id)
            
        allTodos = allTodos.filter(item=>item !== todo)
        
        e.target.parentNode.parentNode.remove()
        
           
     }

     if(e.target && e.target.dataset.action === 'archive'){
       
        const todo = allTodos.find(task=>task.id === +e.target.dataset.id)
        todo.isArchive = !todo.isArchive;

        e.target.parentNode.parentNode.remove()
        if (todo.isArchive === true){
            createTodo(todo,archiveSection,'archive')
        } else {
            createTodo(todo,activeSection,'active')
        }
        
     }

     renderSummary(allTodos,summarySection)
 });