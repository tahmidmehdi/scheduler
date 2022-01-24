import React from "react";

import PropTypes from "prop-types";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

function InterviewerList(props) {
  let interviewers = [];
  if (props.interviewers) {
    interviewers = props.interviewers.map(interv => <InterviewerListItem
        key={interv.id}
        name={interv.name} 
        avatar={interv.avatar} 
        selected={interv.id === props.value}
        setInterviewer={event => props.onChange(interv.id)}
      />
    );
  }
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;
