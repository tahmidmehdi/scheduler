export function getAppointmentsForDay(state, day) {
    //... returns an array of appointments for that day
    const days = state.days;
    const dayOfInterest = days.find(d => d.name === day);
    if (dayOfInterest) {
        return dayOfInterest.appointments.map(id => state.appointments[id]);
    } else {
        return [];
    }
}
  
export function getInterview(state, interview) {
    if (!interview) {
        return null;
    }
    //The function should return a new object containing the interview data when we pass it an object that contains the interviewer. Otherwise, the function should return null
    const interviewer = state.interviewers[interview.interviewer];
    if (interviewer) {
        return {student: interview.student, interviewer};
    } else {
        return null;
    }
}