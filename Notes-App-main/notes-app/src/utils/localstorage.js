function addToLocalStorage(key, value){
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Error saving to localStorage", error);
    }
};

function getFromLocalStorage(key){
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Error reading from localStorage", error);
        return null;
    }
};


function updateLocalStorage(key, updatedValue){
    let value=localStorage.getItem(key);
    if(!value){
        return null;
    }

    try{
        localStorage.setItem(key, updatedValue);
    }catch(error){
        return value;
    }
}

function removeFromLocalStorage(key){
    localStorage.removeItem(key);
}

const methods={
    addToLocalStorage,
    getFromLocalStorage,
    updateLocalStorage,
    removeFromLocalStorage
}

export default methods;