import Form from "../ui-components/form"
import Input from "../ui-components/input"

export default function CoworkersForm({values, setValues, handleChange}) {

    const coworkersInputs = [
        {
          id : 1,
          type : 'text',
          name : 'name',
          placeholder : 'გრიშა',
          label : 'სახელი',
          required : true,
          errorMessage : 'blabla',
          pattern : "^[A-Za-z0-9]{3,16}$",
          error : {
            pattern : '',
            message : 'მინიმუმ 2 სიმბოლო',
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
            pattern : '',
            message : 'მინიმუმ 2 სიმბოლო',
          },
          error_1 : {
            pattern : '',
            message : 'გამოიყენე ქართული ასოები',
          },
          message : 'მინიმუმ 2 სიმბოლო, ქართული ასოები'
        },
        {
          id : 3,
          type : 'text',
          sub_type : 'select',
          name : 'team',
          placeholder : 'თიმი',
          required : true,
        },
        {
          id : 4,
          type : 'text',
          sub_type : 'select',
          name : 'position',
          placeholder : 'პოზიცია',
          required : true,
        },
        {
          id : 5,
          type : 'email',
          name : 'email',
          placeholder : 'grish666@redberry.ge',
          label : 'მეილი',
          required : true,
          error : {
            pattern : '',
            message : 'მეილი არასწორია',
          },
          message : 'უნდა მთავრდებოდეს @redberry.ge-ით',
        },
        {
          id : 6,
          type : 'phone',
          name : 'phone',
          placeholder : '+995 598 00 07 01',
          label : 'ტელეფონის ნომერი',
          required : true,
          error : {
            pattern : '',
            message : 'ნომრის ფორმატი არასწორია',
          },
          message : 'უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს',
          message_phone : 'ქართული მობ-ნომრის ფორმატი',
        },
      ]

    return(
        <>
            <Form render = 
                {
                    coworkersInputs.map((e,i) => 
                        <Input key = {e.id} {...e} handleChange = {handleChange} value = {values[e.name]}/>
                    )
                }
            />
        </>
    )
}