import  {getData,createTodo,showForm,hideForm}  from "./module.js";
import { getDate } from "./utils.js";

const addForm = document.querySelector('form')
const activeSection = document.querySelector('.items')

const addBtn = document.querySelector('#btn-add')








let allTodos = await getData()
let activeTodos = allTodos.filter(item=>item.isArchive === false)
let archiveTodos = allTodos.filter(item=>item.isArchive === true)

//initial render of all to-dos
activeTodos.forEach(item=>createTodo(item,activeSection))
        
    

    


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

    createTodo(formProps,activeSection)
    hideForm(addForm)
})






