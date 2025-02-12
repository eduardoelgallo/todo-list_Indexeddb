import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";
import { Home } from "./Views/Home";
import Settings from "./Components/Settings";

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<Settings>
				<CssBaseline />
				<Home />
			</Settings>
		</ThemeProvider>
	);
}
