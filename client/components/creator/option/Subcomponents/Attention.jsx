import React from 'react';

const Attention = (props) => {

  const calcAvgAtten = (arr) => {
    return (Math.floor(100*arr.reduce((sum, val) => sum += val, 0)/arr.length)*100)/100;
  }

  const timeClickCb = (e) => {
    var desired = $(e.target)[0].innerText;
    var seconds = desired.slice(0, desired.length - 1)
    props.timestampCallback(seconds)
  }

  const calcLostFocus = (arr) => {
    arr = arr.slice(0, 82)
    let moments = [];
    for (var i = 0; i < 5; i++) {
      var min = Math.min.apply(null, arr)
      var indexAndSecond = arr.indexOf(min);
      var boredObj = {
        time: indexAndSecond,
        value: min
      }
      moments.push(boredObj);
      arr.splice(indexAndSecond, 1);
    }
    moments = moments.sort((a, b) => a.time - b.time)
    return moments;
  }


  return (
    <div className="testerAttention">
      <p> Average Attention: {calcAvgAtten(props.attention.slice(1))}%</p>
      <p> Viewers lost focus: </p>
      <ul>
        {calcLostFocus(props.attention.slice(4)).map((moment, i) => (
          <li key={i}>
            <a onClick={timeClickCb} className='lapseInFocus'>
              {moment.time}s
            </a>
            <a> - </a>
            <a>
              ({moment.value*100}%)
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default Attention;
