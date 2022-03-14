import { TextField, Button } from "@mui/material";
import axios from 'axios'
import { useForm, Controller } from "react-hook-form"
import Header from './Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { TextInput } from "./TextInput";

function Form() {

    const errorMessage = ({ closeToast, toastProps }) => (
        <div>
          Lorem ipsum dolor {toastProps.position}
          <button>Retry</button>
          <button onClick={closeToast}>Close</button>
        </div>
      )

    const toastSuccess = () => toast.success("Submit Successful")

    const toastError = (data) => toast.error("Submit Failed")

    const { control, handleSubmit } = useForm({
        defaultValues: {
          name: '',
        }
      });

    const onSubmit = (data) => {
        axios.post('/contact/submit', data)
            .then(function (response) {
                if (response.data.success) { toastSuccess() }
            })
            .catch(function (error) {
                if (error.response.data.success) { toastError() }
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
            <ToastContainer />
        </>
    );
}

export default Form;
