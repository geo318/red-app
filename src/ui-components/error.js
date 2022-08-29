export default function Error({error}) {
    return (
        <>
            <span style={{'color':'red'}} className="error">{error}</span>
        </>
    )
}