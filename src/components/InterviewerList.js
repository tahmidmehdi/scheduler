import React from "react";

import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map(interv => <InterviewerListItem
      key={interv.id}
      name={interv.name} 
      avatar={interv.avatar} 
      selected={interv.id === props.interviewer}
      setInterviewer={event => props.setInterviewer(interv.id)}
    />
  );
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}
