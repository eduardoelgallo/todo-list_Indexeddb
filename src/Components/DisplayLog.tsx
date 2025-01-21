import { Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import WarningIcon from "@mui/icons-material/Warning";

const DisplayLog: React.FC<{ log: String[] }> = ({ log }) => {
	return (
		<Card>
			<CardContent>
				{log.map((item, index) => (
					<Stack direction="row" spacing={1} key={index}>
						<WarningIcon fontSize="small" color="secondary" />{" "}
						<Typography key={index} variant="caption">
							{item}
						</Typography>
					</Stack>
				))}
			</CardContent>
		</Card>
	);
};

export default DisplayLog;
