export const postData = async (url,data) => {
    try {
        const response = await fetch(url, {
        method: 'POST',
        //   mode: 'cors',
        //   cache: 'no-cache',
        //   credentials: 'same-origin',
        // headers: {
        //     'Content-type': 'application/json; charset=UTF-8'
        // },
        body: data//JSON.stringify(data)
        });
        if(response.ok) {
            const res = await response.json();
            return true
        }
        console.log(response)
    } catch(e) {
        console.log(e)
    }
}