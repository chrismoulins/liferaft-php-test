import { Controller } from "react-hook-form"
import { TextField } from "@mui/material"

const TextInput = ({name, control, label}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField onChange={onChange} value={value} label={label} error={!!error} helperText={error ? error.message : null} />
            )}
        />
    )
}

export default TextInput