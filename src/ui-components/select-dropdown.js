export default function SelectDropdown({render, selected}) {
    return (
        <div className ='select-dropdown' style={selected ? {'display':'block'}: {'display':'none'} }>
            {render}
        </div>
    )
}