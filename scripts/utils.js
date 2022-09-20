export function formatMaxWidth(title){
    return (title.length > 30) ? title.slice(0,27) + '...': title  
}

export function formatCategory(category){
    switch(category){
        case 'task':
            return 'Task'
            

        case 'randomThought':
            return 'Random Thought'
        
        default: return 'Idea'

    }
}

export function getDate(){
    let date = new Date
    return date.toLocaleDateString()
}