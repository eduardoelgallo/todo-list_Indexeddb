import React from "react";
import {
	Button,
	ButtonGroup,
	useColorScheme,
} from "@mui/material";
import { DefaultColorScheme } from "@mui/material/styles/createThemeWithVars";
import HighlightIcon from "@mui/icons-material/Highlight";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";

const ThemeSelector: React.FC = () => {
	const { mode, setMode } = useColorScheme();

	const handlerChangeTheme = (theme: string) => {
		setMode(theme as DefaultColorScheme);
	};

	return (
		<ButtonGroup variant="text" color="secondary" size="small">
			<Button 
                variant={(mode as String) == "ligth" ? "contained" : "text"} onClick={() => handlerChangeTheme("ligth")}>
				{" "}
				<HighlightIcon />{" "}
			</Button>
			<Button
                variant={(mode as String) == "system" ? "contained" : "text"}
                onClick={() => handlerChangeTheme("system")}>
				{" "}
				<SettingsBrightnessIcon />
			</Button>
			<Button
                variant={(mode as String) == "dark" ? "contained" : "text"}
                onClick={() => handlerChangeTheme("dark")}>
				{" "}
				<DarkModeIcon />
			</Button>
		</ButtonGroup>
	);
};

export default ThemeSelector;
