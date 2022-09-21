export function formatMaxWidth(title){
    return (title.length > 140) ? title.slice(0,27) + '...': title  
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

export function parseDates(content){
    const reg = /\d{2}[/\.-]\d{2}[/\.-](?:\d{4}|\d{2})/g
    let dates = content.match(reg)
    
    if (dates){
        return dates.join('\n')
    }
    return ''
}