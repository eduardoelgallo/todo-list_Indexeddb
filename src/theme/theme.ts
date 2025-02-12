import { createTheme } from "@mui/material";
import { amber, brown, orange, purple, yellow } from "@mui/material/colors";

export const theme = createTheme({
    colorSchemes: {
        dark: {
            palette: {
                primary: {
                    main: yellow[500],
                },
                secondary: {
                    main: orange[500],
                },
                background: {
                    default: "#212327",
                    //paper: "pink"
                }
            }
        },
        light: {
            palette: {
                primary: {
                    main: brown[500],
                },
                secondary: {
                    main: purple[500],
                },
                background: {
                    default: "#FFFFFF",
                    //paper: "pink"
                }
            }
        },
    },
});