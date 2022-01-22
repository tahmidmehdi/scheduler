import { useState } from "react";

import axios from "axios";


export default function useApplicationData() {
  const [state, setState] = useState({
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
    setState({ ...state, appointments });
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(res => {
        setState({ ...state, appointments, days });
        return state
      });
  };

  function cancelInterview(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };
    const thisDay = {
      ...state.days[id],
      spots: state.days[id].spots - 1
    };
    const days = { ...state.days, [id]: thisDay };
    setState({ ...state, appointments });
    return axios.delete(`/api/appointments/${id}`)
      .then(res => {
        setState({ ...state, appointments, days });
        return state
      });
  };

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, 
        days: all[0].data, appointments: all[1].data, interviewers: all[2].data
      }));
    });
  }, [state]);

  return { state, setDay, bookInterview, cancelInterview };
}