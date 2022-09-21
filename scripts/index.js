import  {getData,createTodo,showForm,hideForm,renderSummary,renderArchive,renderActive,filterData}  from "./module.js";
import { getDate,formatCategory } from "./utils.js";

const activeSection = document.querySelector('.active-render')



let allTodos = await getData()

let [activeTodos,archiveTodos] = filterData(allTodos)

//rendering active section
renderActive(activeTodos,activeSection)     

//getting form fror adding items
const addForm = document.querySelector('form')
const addBtn = document.querySelector('#btn-add')
addBtn.addEventListener('click',()=>showForm(addForm))


//rendering  summary section
const summarySection = document.querySelector('.summary-render')
renderSummary(allTodos,summarySection)

//rendering archive section
const archiveSection = document.querySelector('.archive-render')
renderArchive(archiveTodos,archiveSection)



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




