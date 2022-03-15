import { Controller } from "react-hook-form"
import { MenuItem, Select } from "@mui/material";

const StateProvinceSelect = ({name, control, label, items}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Select onChange={onChange} value={value} label={label} error={!!error} helperText={error ? error.message : null}>
                    {this.items.map((item, index) => (
                        <MenuItem key={item.value} value={item.value}>
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
            )}
        />
    )
}

export default StateProvinceSelect