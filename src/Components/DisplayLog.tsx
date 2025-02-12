import { Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import React from "react";
import WarningIcon from "@mui/icons-material/Warning";

const DisplayLog: React.FC<{ log: String[], sx: any}> = ({ log, sx }) => {
	return (
		<Card sx={{...sx}}>
			<CardHeader
				title={
					<Typography variant="subtitle1" color="secondary">
						Acciones recientes
					</Typography>
				}
				sx={{ pb: 0}}
			/>
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
