import Form from "../ui-components/form"
import Input from "../ui-components/input"
import { inputValues } from "../contexts/input-values"
import { useEffect, useState } from "react"

export default function CoworkersForm({values, handleChange, handleRoute}) {
    const [bulkValidation, setBulkValidation] = useState(false)
    const [errors, setErrors] = useState(false)
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
          message : 'მინიმუმ 2 სიმბოლო, ქართული ასოები'
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
          message : 'მინიმუმ 2 სიმბოლო, ქართული ასოები'
        },
        {
          id : 3,
          type : 'text',
          sub_type : 'select',
          name : 'team_id',
          placeholder : 'თიმი',
          required : true,
          data_url: 'https://pcfy.redberryinternship.ge/api/teams'
        },
        {
          id : 4,
          type : 'text',
          sub_type : 'select',
          filter : 'team_id',
          name : 'position_id',
          placeholder : 'პოზიცია',
          required : true,
          data_url: 'https://pcfy.redberryinternship.ge/api/positions'
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

    const isError = () => {
      let namesArray = coworkersInputs.map(e => e.name)
      let patternsArray = coworkersInputs.map(e => e?.error?.pattern || /./)
      let pattern_1Array = coworkersInputs.map(e => e?.error?.pattern_1 || /./)
      const valuesArray = Object.entries(values)
      const filtered = valuesArray?.filter(e => namesArray.includes(e[0]))
      const test_1 = filtered?.every((e,i) => patternsArray[i]?.test(e[1]))
      const test_2 = filtered?.every((e,i) => pattern_1Array[i]?.test(e[1]))

      if(!test_1 || !test_2) return true

      return false
    }

    return(
        <>
            <inputValues.Provider value = {{values, errors, setErrors, setBulkValidation, bulkValidation}}>
                <Form link = 'laptop' handleRoute={handleRoute} text='next' isError = {isError} render = 
                    {
                        coworkersInputs.map((e,i) =>
                            e.divider ? e.divider :
                            <Input key = {e.id} {...e} handleChange = {handleChange} value = {values[e.name]}/>
                        )
                    }
                />
            </inputValues.Provider>
        </>
    )
}