import { useEffect, useState } from 'react'
import './App.less';
import rolex from './assets/images/rolex.png';
import axios from 'axios'
import moment from 'moment';
import './Countdown.scss';

function RaceCountdown() {

  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [loading, setLoading] = useState(true)
  const [data, setdata] = useState()
  const URL = 'http://ergast.com/api/f1/current/next.json'

  useEffect(() => {
    let date = ""
    const response = async() => {
      await axios.get(URL)
        .then(function(res) {
          console.log(res.data.MRData.RaceTable.Races[0])
          setdata(res.data.MRData.RaceTable.Races[0])
          date = new Date(res.data.MRData.RaceTable.Races[0].date)
          setLoading(false)
        });
    }
      
    response().then(() => {
      setInterval(() => {
        const now = moment();
        const then = moment(date);
        const countdown = moment(then - now);
        setDays(countdown.format('D'));
        setHours(countdown.format('HH'));
        setMinutes(countdown.format('mm'));
        setSeconds(countdown.format('ss'));
      }, 1000);
    });
    
  }, [setdata])

  return (
    <>
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <section className="container">
          <img className="rolex" src={rolex}/>
          <div className="countdown">
            <article>
              <p>{days}</p>
              <h3>Days</h3>
            </article>
            <article>
              <p>{hours}</p>
              <h3>Hours</h3>
            </article>
            <article>
              <p>{minutes}</p>
              <h3>Minutes</h3>
            </article>
            <article>
              <p>{seconds}</p>
              <h3>Seconds</h3>
            </article>
            <article>   
            </article>
            <article>
            </article>
            <article>
            </article>
            <article>
              <h3></h3>
              <h3>to {data.raceName}</h3>
              <h3>29 Aug, 11:30 PM local time</h3>
            </article>
          </div>
        </section>
      )}
    </>
  )
}

export default RaceCountdown