import { Link } from "react-router-dom"
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WS_URL } from "../App";
import { useEffect, useState } from "react";

const Overview = () => {
  const [temperature1, setTemperature1] = useState(0);
  const [time, setTime] = useState('00:00:00');
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    share: true,
  });

  // useEffect(() => {
  //   const interval = setInterval(() => {
      
  //   }, 1000);
  //   clearInterval(interval);
  // }, []);

  useEffect(() => {
    if (lastMessage?.data){
      const deserResp = JSON.parse(lastMessage?.data);
      console.log(deserResp)
      setTime(deserResp?.time);
      setTemperature1(deserResp?.deviceStatus.TMP_1);
    }
  }, [lastMessage]);

  // const refresh = () => {
  //   if (readyState == ReadyState.OPEN){
  //     sendJsonMessage({
  //       "action": "GET",
  //       "device": "TMP_1"
  //     });
  //   }
  // }

  const onboardLedOn = () => {
    if (readyState == ReadyState.OPEN){
      sendJsonMessage({
        "action": "SET",
        "device": "LED_ONBOARD",
        "data": "1"
      });
    }
  }
  const onboardLedOff = () => {
    if (readyState == ReadyState.OPEN){
      sendJsonMessage({
        "action": "SET",
        "device": "LED_ONBOARD",
        "data": "0"
      });
    }
  }

  const redLedOn = () => {
    if (readyState == ReadyState.OPEN){
      sendJsonMessage({
        "action": "SET",
        "device": "LED_RED",
        "data": "1"
      });
    }
  }
  const redLedOff = () => {
    if (readyState == ReadyState.OPEN){
      sendJsonMessage({
        "action": "SET",
        "device": "LED_RED",
        "data": "0"
      });
    }
  }

  return (
    <>
      <h1>Overview</h1>
      <b>{time}</b>
      {/* <button onClick={refresh}>refresh</button> */}
      <div>{temperature1} C</div>
      <div>
        <button onClick={onboardLedOn}>onboard led on</button>
        <button onClick={onboardLedOff}>onboard led off</button>
      </div>
      <div>
        <button onClick={redLedOn}>led led on</button>
        <button onClick={redLedOff}>led led off</button>
      </div>
      <div>
        <Link to="/settings">settings</Link>
      </div>
    </>
  )
}

export default Overview
