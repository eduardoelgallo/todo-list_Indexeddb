import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";
import { useField } from "formik";

export const SelectApp = ({label, labelId, ...props}: any) => {

    let [field, meta, helpers] = useField(props);

    return (
        <FormControl fullWidth error={(meta.error != undefined && meta.touched)}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                labelId={labelId}
                label={label}
               {...field}
               {...props}
            >
            </Select>
            {
                (meta.error != undefined && meta.touched) && <FormHelperText>{meta.error}</FormHelperText>
            }
        </FormControl>
    )
}