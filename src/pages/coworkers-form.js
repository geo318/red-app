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

const coworkersInputs = [
  {
    id : 1,
    type : 'text',
    name : 'name',
    placeholder : 'გრიშა',
    label : 'სახელი',
    required : true,
    error : {
      pattern : /.{2,}$/,
      message : 'მინიმუმ 2 სიმბოლო',
      pattern_1: /^[\u10A0-\u10FF]+$/,
      message_1 : 'გამოიყენე ქართული ასოები',
    },
    message : 'მინიმუმ 2 სიმბოლო, ქართული ასოები',
    style : {'maxWidth':'50%','marginRight':'22px','flexGrow':1}
  },
  {
    id : 2,
    type : 'text',
    name : 'surname',
    placeholder : 'ბაგრატიონი',
    label : 'გვარი',
    required : true,
    error : {
      pattern : /.{2,}$/,
      message : 'მინიმუმ 2 სიმბოლო',
      pattern_1: /^[\u10A0-\u10FF]+$/,
      message_1 : 'გამოიყენე ქართული ასოები',
    },
    message : 'მინიმუმ 2 სიმბოლო, ქართული ასოები',
    style : {'maxWidth':'50%','marginLeft':'22px','flexGrow':1}
  },
  {
    div: <Divider key='div-1' width='100%' height='50px' />
  },
  {
    id : 3,
    type : 'text',
    sub_type : 'select',
    name : 'team_id',
    placeholder : 'თიმი',
    required : true,
    data_url: 'teams'
  },
  {
    div: <Divider key='div-2' width='100%' height='50px' />
  },
  {
    id : 4,
    type : 'text',
    sub_type : 'select',
    filter : 'team_id',
    name : 'position_id',
    placeholder : 'პოზიცია',
    required : true,
    data_url: 'positions'
  },
  {
    div: <Divider key='div-3' width='100%' height='50px' />
  },
  {
    id : 5,
    type : 'email',
    name : 'email',
    placeholder : 'grish666@redberry.ge',
    label : 'მეილი',
    required : true,
    error : {
      pattern : /^.+@redberry.ge$/,
      message : 'მეილი არასწორია',
    },
    message : 'უნდა მთავრდებოდეს @redberry.ge-ით',
  },
  {
    div: <Divider key='div-4' width='100%' height='50px' />
  },
  {
    id : 6,
    type : 'phone',
    name : 'phone_number',
    placeholder : '+995 598 00 07 01',
    label : 'ტელეფონის ნომერი',
    required : true,
    error : {
      pattern : /^(\+995)(5\d{8})$/,
      message : 'ნომრის ფორმატი არასწორია',
    },
    message : 'უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს',
    message_phone : 'ქართული მობ-ნომრის ფორმატი',
  },
]
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