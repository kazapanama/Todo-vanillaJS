export async function getData(){
    fetch('./mockData.json').then(json=>json.json()).then(data=>{
        
        const done = document.querySelector('#active')
        const archive =  document.querySelector('#archive')
        const active = data.filter(item=>item.isArchive === false)
        const completed = data.filter(item=>item.isArchive === true)
        renderActive(active,done)
        renderArchive(completed,archive)
    }
        
        )
}

export function renderActive(data,node){
    let div = document.createElement('div')
    div.classList.add('active-items')

    
    data.forEach(item=> node.innerHTML+=`
    <div class="item">
        <h3>${item.name}</h3>
        <h3>${item.createdAt}</h3>
        <h3>${item.category}</h3>
        <h3>${item.dates}</h3>
    </div>
    
    
    `)
}

export function renderArchive(data,node){
    node.innerHTML += '<h2>ARCHIVE:</h2>'
    data.forEach(item=> node.innerHTML+=`
    <h3>${item.name}</h3>
    `)
}