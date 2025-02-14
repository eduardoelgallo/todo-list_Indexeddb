import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";
import { Home } from "./Views/Home";
import SettingsProvider from "./Providers/SettingsProvider";
import DatabaseProvider from "./Providers/DatabaseProvider";

export default function App() {
	return (
		<DatabaseProvider>
			<ThemeProvider theme={theme}>
				<SettingsProvider>
					<CssBaseline />
					<Home />
				</SettingsProvider>
			</ThemeProvider>
		</DatabaseProvider>
	);
}
