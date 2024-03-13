
export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    formatDate
}

function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}

function formatDate(time){
    const currDate = new Date(Date.now())
    const date = new Date(time)
    // let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let month = date.toLocaleString('default', { month: 'short' });

    if(currDate.getFullYear() !== date.getFullYear()){
        return date.getFullYear()
    } else {
        return dd + ' ' + month;
    }
}
