import Form from "../ui-components/form"
import Input from "../ui-components/input"
import { inputValues } from "../contexts/input-values"
import { useState } from "react"

export default function CoworkersForm({values, handleChange}) {
    const [errors, setErrors] = useState(true)
    const [bulkValidation, setBulkValidation] = useState(false)
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

    return(
        <>
            <inputValues.Provider value = {{errors, setErrors, setBulkValidation, bulkValidation}}>
                <Form link = '/form/laptop' text='next' render = 
                    {
                        coworkersInputs.map((e,i) => 
                            <Input key = {e.id} {...e} handleChange = {handleChange} value = {values[e.name]}/>
                        )
                    }
                />
            </inputValues.Provider>
        </>
    )
}