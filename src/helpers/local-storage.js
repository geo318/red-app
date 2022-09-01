
export const localStore = (name, data) => {

    if(data) {
        localStorage.setItem(name, JSON.stringify(data));
        return
    }

    try {
        const item = localStorage.getItem(name);
        if(item) return JSON.parse(item)

    } catch (error) {
        console.log(error);
    }
}