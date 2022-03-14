import { TextField, Button } from "@mui/material";
import axios from 'axios'
import { useForm, Controller } from "react-hook-form"
import Header from './Header'
// import { TextInput } from "./TextInput";

function Form() {

    const { control, handleSubmit } = useForm({
        defaultValues: {
          name: '',
        }
      });

    const onSubmit = (data) => {
        axios.post('/contact/submit', data)
          .then(function (response) {
              debugger;
          })
          .catch(function (error) {
              debugger;
          });
    };

    return (
        <>
            <Header />
            <form>
                <Controller
                    name={"name"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                    <TextField onChange={onChange} value={value} label={"Enter your Name"} />
                    )}
                />
                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>

            </form>
        </>
    );
}

export default Form;
