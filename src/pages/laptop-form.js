import Form from "../ui-components/form"
import Input from "../ui-components/input"
import { inputValues } from "../contexts/input-values"
import { useMemo, useState } from "react"
import ImageUpload from "../ui-components/image-upload/image-upload"
import gel from "../assets/images/gel.svg"
import Header from "../ui-components/header"
import Tab from "../ui-components/tab/tab"
import Divider from "../ui-components/divider"
import Icon from "../ui-components/icon"
import rocket from "../assets/images/rocket.png"
import { validator } from "../helpers/validator"
import { laptopInputs } from "./dataSet/input-data"


export default function LaptopForm({values, setValues, handleChange, handleRoute, formData, fallback}) {
  const [bulkValidation, setBulkValidation] = useState(false)
  const imageUploaderDetails = {name: 'laptop_image',text:'ჩააგდე ან ატვირთე ლეპტოპის ფოტო', buttonText: 'ატვირთე'}
  const isError = useMemo(()=>validator(laptopInputs, values),[values])
  
  return(
    <div className="form-wrapper">
      <Header link = '/form/coworkers' renderStyle={{'paddingTop':36}} render = {<Tab/>}/>
      <Divider height='27px'/>
      <inputValues.Provider value = {{fallback, setBulkValidation, bulkValidation, formData}}>
        <Form values = {values} setValues={setValues} text='დამახსოვრება' backLink='/form/coworkers' handleRoute={handleRoute} submit isError = {isError} render = 
          { 
            <>
              <ImageUpload formData = {formData} handleChange = {handleChange} value = {values.laptop_image} {...imageUploaderDetails}/>
              <Divider height='89px' width='100%'/>
                {    
                  laptopInputs.map(e =>
                    e.div ? e.div : <Input key = {e.id} {...e} handleChange = {handleChange} value = {values[e.name]}/>
                  )
                }
            </>
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