import React from 'react';
import PropTypes from 'prop-types';
import unknown from '/public/img/unknown.png'

const Hop = props => {
    return (
        <div id={`hop`} className={`flex flex-row justify-between w-full p-2 bg-slate-600 rounded-xl hover:bg-slate-500
        duration-100 cursor-pointer`}>
            <div className={`flex flex-col`}>
                <span className={`font-mono text-xl`}>{props.ipAddr}</span>
                {(props.city && props.country) ? (<span className={`font-sans`}>{props.city}, {props.country}</span>) : null}
                <img
                    src={props.countryCode ? `https://flagsapi.com/${props.countryCode}/flat/64.png` : `/img/unknown.png`}
                    alt={`Flag`} className={`w-8 h-8`}/>
            </div>
            <div className={`flex flex-col items-end`}>
                <span className={`font-mono text-sm opacity-50`}>#{props.hop}</span>
                <span className={`font-mono text-lg`}>{props.ping}</span>
            </div>
        </div>
    );
};

Hop.propTypes = {
    ipAddr: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    city: PropTypes.string,
    country: PropTypes.string,
    countryCode: PropTypes.string,
    region: PropTypes.string,
    isp: PropTypes.string,
    ping: PropTypes.number,
    hop: PropTypes.number,
    timestamp: PropTypes.string,
};

Hop.defaultProps = {
    ipAddr: '999.999.999.999',
    city: '',
    country: '',
    hop: 0,
    countryCode: '',
}

export default Hop;