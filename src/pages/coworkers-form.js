import Form from "../ui-components/form"
import Input from "../ui-components/input"
import rocket from "../assets/images/rocket.png"
import { inputValues } from "../contexts/input-values"
import { useMemo, useState } from "react"
import Header from "../ui-components/header"
import Divider from "../ui-components/divider"
import Tab from "../ui-components/tab/tab"
import Icon from "../ui-components/icon"
import { validator } from "../helpers/validator"
import { coworkersInputs } from "./dataSet/input-data"

export default function CoworkersForm({values, handleChange, handleRoute}) {
  const [bulkValidation, setBulkValidation] = useState(false)
  const [errors, setErrors] = useState(false)
  const isError = useMemo(()=>validator(coworkersInputs, values),[values])

  return(
    <div className="form-wrapper">
      <Header link = '/' renderStyle={{'paddingTop':36}} render = {
        <Tab handleClick={()=>handleRoute('laptop',isError)}/>
      }/>
      <Divider height='27px'/>
      <inputValues.Provider value = {{values, errors, setErrors, setBulkValidation, bulkValidation}}>
        <Form link = 'laptop' handleRoute={handleRoute} text='შემდეგი' isError = {isError} render = 
          {
            coworkersInputs.map(e =>
              e.div ? e.div :
              <Input key = {e.id} style={e.style} {...e} handleChange = {handleChange} value = {values[e.name]}/>
            )
          }
        />
      </inputValues.Provider>
      <Divider height='67px'/>
      <div className="flx flx-hc">
        <Icon render={rocket} />
      </div>
      <Divider height='45px'/>
    </div>
  )
}