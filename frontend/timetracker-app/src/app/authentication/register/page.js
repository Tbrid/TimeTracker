"use client";
import * as React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Box, Button, Stack, Typography, TextField } from "@mui/material";
import { Form, Formik } from "formik";

export default function Register() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
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
    username: "",
    password: "",
    password_confirm: "",
    email: "",
    first_name: "",
    last_name: "",
  };

  const onSubmit = (values) => {
    axios({ method: "post", url: `${API_URL}/register/`, data: values })
      .then((response) => {
        if (response.status === 200) {
          console.log("Register success!");
          router.push("/authentication/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
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
                    Register
                  </Typography>

                  <TextField
                    sx={inputTextStyle}
                    fullWidth
                    name={"username"}
                    label="username"
                    onChange={handleChange}
                    value={values.username}
                    onBlur={handleBlur}
                  />

                  <TextField
                    sx={inputTextStyle}
                    fullWidth
                    type="password"
                    name={"password"}
                    label="password"
                    onChange={handleChange}
                    value={values.password}
                    onBlur={handleBlur}
                  />

                  <TextField
                    sx={inputTextStyle}
                    fullWidth
                    type="password"
                    name={"password_confirm"}
                    label="cofirm password"
                    onChange={handleChange}
                    value={values.password_confirm}
                    onBlur={handleBlur}
                  />
                  <TextField
                    sx={inputTextStyle}
                    fullWidth
                    type="email"
                    name={"email"}
                    label="email"
                    onChange={handleChange}
                    value={values.email}
                    onBlur={handleBlur}
                  />
                  <TextField
                    sx={inputTextStyle}
                    fullWidth
                    name={"first_name"}
                    label="First Name"
                    onChange={handleChange}
                    value={values.first_name}
                    onBlur={handleBlur}
                  />
                  <TextField
                    sx={inputTextStyle}
                    fullWidth
                    name={"last_name"}
                    label="Last Name"
                    onChange={handleChange}
                    value={values.last_name}
                    onBlur={handleBlur}
                  />
                </Stack>
              </Box>
              <Box textAlign="center" sx={{ marginTop: 2 }}>
                <Button
                  sx={{ width: 180 }}
                  type="submit"
                  color="primary"
                  size="large"
                  variant="contained"
                >
                  Reigster
                </Button>
              </Box>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}
