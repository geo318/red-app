export default function Form({render}) {

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target) 
        console.log(Object.fromEntries(data))
    }

    
    return (
        <form onSubmit={handleSubmit} onInvalid={e => e.preventDefault()}>
            {render}
            <button>submit</button>
        </form>
    )
}