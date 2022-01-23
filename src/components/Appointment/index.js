import React from 'react'

import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  function deleteInterview() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  function edit() {
    transition(EDIT);
  }  

  useEffect(() => {
    if (interview && mode === EMPTY) {
     transition(SHOW);
    }
    if (interview === null && mode === SHOW) {
     transition(EMPTY);
    }
  }, [props.interview, transition, mode]);

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
          onDelete={() => transition(CONFIRM)}
          onEdit={edit}
        />
      )}
      {mode === EDIT && (
        <Form name={student} interviewers={props.interviewers} onSave={save} onCancel={back} />
      )}
      {mode === CONFIRM && (
        <Confirm message="Are you sure you would like to delete?" onCancel={back} onConfirm={deleteInterview} />
      )}
      {mode === CREATE && (
        <Form name={student} interviewers={props.interviewers} onCancel={back} onSave={save}/>
      )}
      {mode === SAVING && (
        <Status message="Saving" />
      )}
    </article>
  );
}
