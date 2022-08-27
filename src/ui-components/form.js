export default function Form({render}) {

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target) 
        console.log(Object.fromEntries(data))
    }

    return (
        <form onSubmit={handleSubmit}>
            {render}
            <button type="submit">submit</button>
        </form>
    )
}