import { Link } from "react-router-dom"
import useWebSocket, { ReadyState } from "react-use-websocket";
import { WS_URL } from "../App";
import { useEffect, useState } from "react";

const Overview = () => {
  const [temperature1, setTemperature1] = useState(0);
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
      setTemperature1(deserResp?.data);
    }
  }, [lastMessage]);

  const refresh = () => {
    if (readyState == ReadyState.OPEN){
      sendJsonMessage({
        "action": "get",
        "device": "TMP_1"
      });
    }
  }

  const onboardLedOn = () => {
    if (readyState == ReadyState.OPEN){
      sendJsonMessage({
        "action": "set",
        "device": "LED_ONBOARD",
        "data": "1"
      });
    }
  }
  const onboardLedOff = () => {
    if (readyState == ReadyState.OPEN){
      sendJsonMessage({
        "action": "set",
        "device": "LED_ONBOARD",
        "data": "0"
      });
    }
  }

  const redLedOn = () => {
    if (readyState == ReadyState.OPEN){
      sendJsonMessage({
        "action": "set",
        "device": "LED_RED",
        "data": "1"
      });
    }
  }
  const redLedOff = () => {
    if (readyState == ReadyState.OPEN){
      sendJsonMessage({
        "action": "set",
        "device": "LED_RED",
        "data": "0"
      });
    }
  }

  return (
    <>
      <div>Overview</div>
      <button onClick={refresh}>refresh</button>
      <div>{temperature1}</div>
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
