"use client";
import * as React from "react";
import axios from "axios";
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  MenuItem,
  Modal,
} from "@mui/material";
import { Form, Formik } from "formik";

export default function AddTask(props) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const PORJECTS = [
    "Electric cars",
    "Rockets",
    "Social platform",
    "Payment system",
    "Satellites",
    "Mind chips",
  ];
  const sectionStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    marginBottom: 6,
  };

  const inputTextStyle = {
    input: { color: "primary.darker" },
  };

  const initialValues = {
    user_id: "",
    description: "",
    hours: "",
    project: "",
  };

  const style = {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    width: "60%",
    height: "auto",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    paddingTop: 5,
    paddingBottom: 2,
    paddingLeft: 6,
    paddingRight: 6,
  };

  const onSubmit = (values) => {
    let access = "";

    if (typeof window !== "undefined" && window.localStorage) {
      access = localStorage.getItem("access");
    }

    axios({
      method: "post",
      url: `${API_URL}/user_tasks/${values.user_id}/tasks/`,
      data: values,
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Add task success!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Modal
        open={props.open}
        onClose={(_, reason) => {
          if (reason !== "backdropClick") props.handleClose();
        }}
      >
        <Box sx={{ ...style }}>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validateOnBlur
            validateOnMount
          >
            {({
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              isValid,
              dirty,
            }) => (
              <div>
                <Form noValidate autoComplete="off">
                  <Box display={"flex"}>
                    <Stack spacing={3} sx={sectionStyle}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: "text.secondary",
                        }}
                      >
                        Add Task
                      </Typography>
                      <TextField
                        sx={inputTextStyle}
                        fullWidth
                        name={"user_id"}
                        label="user id"
                        onChange={handleChange}
                        value={values.user_id}
                        onBlur={handleBlur}
                      />
                      <TextField
                        sx={inputTextStyle}
                        fullWidth
                        type="number"
                        name={"hours"}
                        label="Hours"
                        onChange={handleChange}
                        value={values.hours}
                        onBlur={handleBlur}
                      />
                      <TextField
                        sx={inputTextStyle}
                        fullWidth
                        name={"description"}
                        label="Description"
                        onChange={handleChange}
                        value={values.description}
                        onBlur={handleBlur}
                      />

                      <TextField
                        sx={inputTextStyle}
                        fullWidth
                        select
                        name={"project"}
                        label="Project"
                        onChange={handleChange}
                        value={values.project}
                        onBlur={handleBlur}
                      >
                        {PORJECTS.map((project, index) => {
                          return (
                            <MenuItem key={`project-${index}`} value={project}>
                              {project}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </Stack>
                  </Box>
                  <Box textAlign="center" sx={{ marginTop: 2 }}>
                    <Button
                      sx={{ width: 90 }}
                      type="submit"
                      color="primary"
                      size="large"
                      variant="contained"
                    >
                      Add
                    </Button>
                    <Button
                      sx={{ width: 90, marginLeft: 2 }}
                      color="primary"
                      size="large"
                      variant="contained"
                      onClick={props.handleClose}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Form>
              </div>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
