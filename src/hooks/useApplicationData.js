import { useReducer, useEffect } from "react";

import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";


export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const thisDay = {
      ...state.days[id],
      spots: state.days[id].spots + 1
    };
    const days = {
      ...state.days,
      [id]: thisDay
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(res => {
        dispatch({ type: SET_APPLICATION_DATA, state: { appointments, days } });
        return state
      });
  }

  function cancelInterview(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };
    const thisDay = {
      ...state.days[id],
      spots: state.days[id].spots - 1
    };
    const days = { ...state.days, [id]: thisDay };
    return axios.delete(`/api/appointments/${id}`)
      .then(res => {
        dispatch({ type: SET_APPLICATION_DATA, state: { appointments, days } });
        return state
      });
  };

  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    let socket = new WebSocket("ws://localhost:8001");
    socket.send("ping");
    socket.onmessage = function (event) {
      console.log(`Message Received: ${event.data}`);
    }
    // Listen for the "SET_INTERVIEW" messages on the client. Update the specific appointment state based on the value of interview
    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      dispatch({ type: SET_INTERVIEW, interview: data });
    }
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, state: { 
        days: all[0].data, appointments: all[1].data, interviewers: all[2].data 
      } });
    });
    socket.close();
  }, [state]);

  return { state, setDay, bookInterview, cancelInterview };
}