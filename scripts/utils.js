export function formatMaxWidth(title){
    return (title.length > 30) ? title.slice(0,27) + '...': title  
}