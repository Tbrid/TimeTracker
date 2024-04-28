"use client";
import * as React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Box, Button, Stack, Typography, TextField } from "@mui/material";
import { Form, Formik } from "formik";

export default function Login() {
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
  };

  const handleSaveAccess = (access, refresh) => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
    }
  };

  const onSubmit = (values) => {
    axios({ method: "post", url: `${API_URL}/login/`, data: values })
      .then((response) => {
        if (response.status === 200) {
          console.log("Login success!");
          handleSaveAccess(response.data.access, response.data.refresh);
          router.push("/tasks");
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
                    Login
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
                </Stack>
              </Box>
              <Box textAlign="center" sx={{ marginTop: 2 }}>
                <Button
                  sx={{ width: 180 }}
                  type="submit"
                  color="primary"
                  size="large"
                  variant="contained"
                  disabled={!isValid || !touched}
                >
                  Log In
                </Button>
              </Box>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}
