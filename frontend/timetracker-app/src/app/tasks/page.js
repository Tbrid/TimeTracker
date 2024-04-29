"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Stack,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
  TableCell,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import AddTask from "@/components/AddTaskForm";

export function BasicDatePicker(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Choose Date"
          onChange={props.onChange}
          //defaultValue={dayjs()}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default function Tasks() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const [tasks, setTasks] = useState(null);
  const [date, setDate] = useState(null);
  const [users, setUsers] = useState(null);
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);

  useEffect(() => {
    let access = "";
    let currentUser = "";
    if (typeof window !== "undefined" && window.localStorage) {
      access = localStorage.getItem("access");
      currentUser = localStorage.getItem("user");
    }

    // Date calculation Logic from: https://stackoverflow.com/questions/5210376/how-to-get-first-and-last-day-of-the-current-week-in-javascript#:~:text=var%20today%20%3D%20new%20Date()%3B%20var%20startDay%20%3D%200%3B%20var,()%20%2B%20(7%20%2D%20today.
    // Want to display only tasks in current week of the selected date
    let firstday = null;
    let lastday = null;
    if (date) {
      var curr = new Date(date);
      var first = curr.getDate() - curr.getDay();
      var last = first + 6;

      firstday = new Date(curr.setDate(first)).toISOString();
      lastday = new Date(curr.setDate(last)).toISOString();

      axios({
        method: "get",
        url: `${API_URL}/user_tasks/${currentUser}/tasks/`,
        params: { start_time: firstday, end_time: lastday },
        data: {},
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            setTasks(response.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [date]);

  useEffect(() => {
    let access = "";
    if (typeof window !== "undefined" && window.localStorage) {
      access = localStorage.getItem("access");
    }
    axios({
      method: "get",
      url: `${API_URL}/users/`,
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onDateChange = (value) => {
    const d = new Date(value.$d);

    setDate(d.toISOString());
  };

  return (
    <Box display={"flex"} justifyContent="center">
      <Stack direction={"column"} spacing={2}>
        <Stack direction={"row"} spacing={2}>
          <BasicDatePicker onChange={onDateChange} />
          <Button
            onClick={() => {
              setAddTaskModalOpen(true);
            }}
          >
            Add task
          </Button>
        </Stack>
        {tasks && (
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Project</TableCell>
                    <TableCell align="right">Hours</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Start Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.tasks.map((task) => (
                    <TableRow
                      key={task.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {task.project}
                      </TableCell>
                      <TableCell align="right">{task.hours}</TableCell>
                      <TableCell align="right">{task.description}</TableCell>
                      <TableCell align="right">{task.start_time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer sx={{ marginTop: 8 }} component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Project</TableCell>
                    <TableCell align="right">Total hours</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.totals.map((total, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {total.project}
                      </TableCell>
                      <TableCell align="right">{total.total_hours}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
        {!tasks ||
          (tasks.tasks.length < 1 && (
            <Typography>
              No tasks in week of selected date, try changing it!
            </Typography>
          ))}
      </Stack>
      <AddTask
        open={addTaskModalOpen}
        users={users}
        handleClose={() => {
          setAddTaskModalOpen(false);
        }}
      />
    </Box>
  );
}
