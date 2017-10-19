import React from 'react';

const Feedback = (props) => {

  const convertStringLikeRatio = (lr) => {
    let indOfSlash = lr.indexOf('/');
    let numerator = +lr.slice(0, indOfSlash);
    let denominator = +lr.slice(indOfSlash+1);
    let ratio = numerator/denominator;
    return ratio;
  }

  return (
    <div className="testerFeedback">

      <div className="rawValues">
        <p> Watched {props.completionStatus}% of video</p>
        <p>Like: {props.likeRatio}</p>
        <p> Comments: </p>
      </div>

      <div className="progressBars">
        <progress max={100} value={props.completionStatus}></progress>
        <br/><br/>
        <progress max={1} value={convertStringLikeRatio(props.likeRatio)}></progress>
      </div>
    </div>
  )
};

export default Feedback;
