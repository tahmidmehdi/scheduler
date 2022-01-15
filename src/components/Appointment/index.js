import React from 'react'

import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  let student = "";
  if (props.interview) {
    if (props.interview.hasOwnProperty('student')) {
      student = props.interview.student;
    }
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form name={student} interviewers={props.interviewers} onCancel={back} />
      )}
    </article>
  );
}
