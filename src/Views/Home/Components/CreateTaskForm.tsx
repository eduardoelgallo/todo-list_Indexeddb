import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Formik } from 'formik'
import * as yup from 'yup';
import EventIcon from '@mui/icons-material/Event';
import { TextFieldApp } from "../../../Components/TextFieldApp";
import { SelectApp } from "../../../Components/SelectApp";
import ITask from "../../../Interfaces/ITask";
import React from "react";
import TaskFactory from "../../../Services/Factories/TaskFactory";
import Task from "../../../Domain/Task";
import useSettings from "../../../Hooks/useSettings";


const validationSchema = yup.object({
    title: yup
      .string()
      .required('El titulo es requerido')
      .max(30, 'El titulo no puede tener mas de 30 caracteres'),
    hour: yup.string().matches(/[0-9]/, "Solo se permiten caracteres numericos")
        .required("Este campo es requerido").length(2, "La hora no puede tener mas de 2 digitos"),
    minutes: yup.string().matches(/[0-9]/, "Solo se permiten caracteres numericos")
        .required("Este campo es requerido").length(2, "La hora no puede tener mas de 2 digitos"),
    day: yup.number().required("Este campo es requerido"),
    month: yup.number().required("Este campo es requerido"),
    year: yup.number().required("Este campo es requerido"),
 
  });
  

const CreateTaksForm: React.FC<{addTask: (task: Task) => void}>= ({addTask}) => {

	const { isTwentyFourHours } = useSettings();

    let initialValue: ITask = {
        title: "",
        hour: "",
        minutes: "",
        day: "",
        month: "",
        year: "",
		notified: "no"
    }


	return (
		<Formik
			initialValues={initialValue}
			validationSchema={validationSchema}
			onSubmit={(values, { setSubmitting }) => {
				
				let task = TaskFactory.createTask({ ...values, notified: "no" });

				setTimeout(() => {
					addTask(task);

					setSubmitting(false);
				}, 400);
			}}
			initialTouched={{
				title: true,
			}}
			initialErrors={{
				title: "El titulo es requerido",
			}}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
				isSubmitting,
				isValid,
				getFieldProps,
			}) => (
				<Card sx={{ maxWidth: 500 }}>
					<CardHeader
						title={
							<Typography variant="h5" gutterBottom>
								Agregar nueva tarea
							</Typography>
						}
						sx={{ textAlign: "center" }}
					/>
					<CardContent>
						<Grid container spacing={2}>
							<Grid size={12}>
								<TextFieldApp
									id="title"
									name="title"
									label="Titulo"
									variant="outlined"
									type="text"
									fullWidth
									size="small"
								/>
							</Grid>
							<Grid size={6}>
								<TextFieldApp
									id="hour"
									name="hour"
									label="Hora (hh)"
									variant="outlined"
									type="text"
									fullWidth
									size="small"
								/>
							</Grid>

							<Grid size={6}>
								<TextField
									id="minutes"
									label="Minutos (mm)"
									variant="outlined"
									fullWidth
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.minutes}
									size="small"
									error={
										errors.hasOwnProperty("minutes") &&
										touched.minutes
									}
									helperText={
										errors.hasOwnProperty("minutes") &&
										touched.minutes
											? errors.minutes
											: ""
									}
								/>
							</Grid>

							<Grid size={4}>
								<SelectApp
									label="Dia"
									id="day-select"
									labelId="day-select-label"
									type="select"
									name="day"
									size="small"
									renderValue={(value: any) => {
										return (
											<Typography variant="body1">
												{value}-
											</Typography>
										);
									}}
								>
									{[
										"",
										1,
										2,
										3,
										4,
										5,
										6,
										7,
										8,
										9,
										10,
										11,
										12,
										13,
										14,
										15,
										16,
										17,
										18,
										19,
										20,
										21,
										22,
										23,
										24,
										25,
										26,
										27,
										28,
										29,
										30,
										31,
									].map((day) => (
										<MenuItem key={day} value={day}>
											<EventIcon /> {day}
										</MenuItem>
									))}
								</SelectApp>
							</Grid>
							<Grid size={4}>
								<FormControl
									fullWidth
									size="small"
									error={
										errors.hasOwnProperty("month") &&
										touched.month
									}
								>
									<InputLabel id="month-select-label">
										Mes
									</InputLabel>
									<Select
										labelId="month-select-label"
										id="month-select"
										label="Mes"
										name="month"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.month}
									>
										<MenuItem value={1}>Enero</MenuItem>
										<MenuItem value={2}>Febrero</MenuItem>
										<MenuItem value={3}>Marzo</MenuItem>
										<MenuItem value={4}>Abril</MenuItem>
										<MenuItem value={5}>Mayo</MenuItem>
										<MenuItem value={6}>Junio</MenuItem>
										<MenuItem value={7}>Julio</MenuItem>
										<MenuItem value={8}>Agosto</MenuItem>
										<MenuItem value={9}>
											Septiembre
										</MenuItem>
										<MenuItem value={10}>Octubre</MenuItem>
										<MenuItem value={11}>
											Noviembre
										</MenuItem>
										<MenuItem value={12}>
											Diciembre
										</MenuItem>
									</Select>
									{errors.hasOwnProperty("month") &&
										touched.month && (
											<FormHelperText>
												El campo es requerido
											</FormHelperText>
										)}
								</FormControl>
							</Grid>
							<Grid size={4}>
								<FormControl
									fullWidth
									size="small"
									error={
										errors.hasOwnProperty("year") &&
										touched.year
									}
								>
									<InputLabel id="year-select-label">
										Año
									</InputLabel>
									<Select
										labelId="year-select-label"
										id="year-select"
										label="Año"
										name="year"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.year}
									>
										<MenuItem value={2025}>2025</MenuItem>
									</Select>
									{errors.hasOwnProperty("year") &&
										touched.year && (
											<FormHelperText>
												El campo es requerido
											</FormHelperText>
										)}
								</FormControl>
							</Grid>
						</Grid>
					</CardContent>
					<CardActions sx={{ justifyContent: "center" }}>
						<Button
							size="small"
							onClick={() => {
								handleSubmit();
								console.log(values);
							}}
							disabled={!isValid}
							variant="contained"
						>
							Agregar tarea
						</Button>
					</CardActions>
				</Card>
			)}
		</Formik>
	);
};

export default CreateTaksForm;
