import React from 'react';

const Emotion = (props) => {

  const calcMaxEmotion = (obj) => {
    var total = 0;
    var max = ["emotion", 0]
    for (var key in obj) {
      let currVal = obj[key].slice(1).reduce((sum, val) => sum+= +val, 0);
      total += currVal;
      if(currVal > max[1]) max = [ obj[key][0], currVal ]
    }
    let Emoshin = max[0][0].toUpperCase() + max[0].slice(1);
    let stringForRender = `${Emoshin} (${Math.floor((max[1]/total)*1000)/10}%)`
    return stringForRender;
  }

  return (
    <div className="testerEmotion">
      <p style={center}> Most Prevalent Emotion: {calcMaxEmotion(props.emotionsObj)}</p>
      <p className='chartHeader'> Overall Emotion Breakdown: </p>
      <div className='emotionChart'></div>
    </div>
  )
};

const center = {
  textAlign: "center"
}

export default Emotion;
