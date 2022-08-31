export default function SelectDropdown({render, selected}) {
    return (
        <div style={selected ? {'display':'block'}: {'display':'none'} }>
            {render}
        </div>
    )
}