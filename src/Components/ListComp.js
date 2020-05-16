import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Sound from 'react-sound';
import chimes from './chimes.mp3'
import fifteenChime from './fiftenChime.mp3';

 
const ListComp = (props) => {

    useEffect(() => {
        props.getList();
        const interval = setInterval(() => {
            props.getList();
        }, 600000)
        return () => clearInterval(interval);
    }, [])

    const minHourTextFormat = (txt) => {
        if(moment(txt, 'YYYYMMDDHHmm').diff(moment(new Date()), 'minutes') > 60) {
            return `${moment(txt, 'YYYYMMDDHHmm').diff(moment(new Date()), 'hours')} HOURS!`
        } else {
            return `${moment(txt, 'YYYYMMDDHHmm').diff(moment(new Date()), 'minutes')} MINUTES!`
        }
    }

    const checkPlaySixty = () => {
        let play = false;
        props.list.forEach(loc => {
            if (moment(loc.expires, 'YYYYMMDDHHmm').diff(moment(new Date()), 'minutes') < 60
            && moment(loc.expires, 'YYYYMMDDHHmm').diff(moment(new Date()), 'minutes') > 15
            ) {
                play = true;
            }
        })
        if (play) {
            return Sound.status.PLAYING
        } else {
            return Sound.status.STOPPED;
        }
    }

    const checkPlayFifteen = () => {
        let play = false;
        props.list.forEach(loc => {
            if (moment(loc.expires, 'YYYYMMDDHHmm').diff(moment(new Date()), 'minutes') < 15
            && moment(loc.expires, 'YYYYMMDDHHmm').diff(moment(new Date()), 'minutes') > 0
            ) {
                play = true;
            }
        })
        if (play) {
            return Sound.status.PLAYING
        } else {
            return Sound.status.STOPPED;
        }
    }



console.log("props list is: ", props.list)
    return (
        <div>
            <ul>
                {props.list.map((loc, i) => {
                    return (
                        <li className="align-left m-btm-15" key={i}>
                            EXPIRES IN {minHourTextFormat(loc.expires)}
                            <ul className="align-left">
                                <li className="align-left">Owned by: {loc.name}</li>
                                <li className="align-left">Located at ({loc.x}, {loc.y})</li>
                                <li className="align-left">Notes: {loc.description}</li>
                            </ul>
                        </li>
                    )
                })}
            </ul>
            <Sound 
             url={chimes}
             playStatus={checkPlaySixty()}
            />
            <Sound 
             url={fifteenChime}
             playStatus={checkPlayFifteen()}
            />
        </div>
    )
}
export default ListComp