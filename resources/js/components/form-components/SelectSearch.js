import { Controller } from "react-hook-form"
import { Autocomplete, TextField } from "@mui/material";

const SelectSearch = ({name, control, label, options, onSelectChange}) => {
    return (
        <Controller
            key={label}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Autocomplete
                    fullWidth
                    options={options}
                    autoHighlight
                    getOptionLabel={(option) => option.label ?? option}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            value={value}
                            error={!!error} helperText={error ? error.message : null}
                            label={label}
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'auto',
                            }}
                        />
                    )}
                    onChange={(_, data) => {
                        value = data == null ? '' : data.label
                        onSelectChange && onSelectChange(value)
                        onChange(value)
                        return value;
                    }}
                />
            )}
            name={name}
            control={control}
        />
    )
}

export default SelectSearch