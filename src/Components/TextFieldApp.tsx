import { TextField } from "@mui/material";
import { useField } from "formik";


export const TextFieldApp = ({label, ...props}: any) => {

    const [field, meta] = useField(props);

    return (
        <TextField
            {...field}
            {...props}
            label={label}
            error={(meta.error && meta.touched)}
            helperText={(meta.error && meta.touched) ? meta.error : ''}
        />
    )
}