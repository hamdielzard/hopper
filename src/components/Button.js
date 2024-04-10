import React from 'react';
import PropTypes from 'prop-types';

Button.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string,
    size: PropTypes.string,
    disabled: PropTypes.bool,
    font: PropTypes.string,
    hotkey: PropTypes.string,
};

function Button(props) {
    return (
        <button
            onClick={props.onClick}
            className={`text-amber-50 bg-slate-700 hover:bg-slate-600 rounded-lg px-3 py-1 duration-200
            ${props.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer active:scale-95'} ${props.font}`}
            disabled={props.disabled}
        >
            {props.text} {props.hotkey && <span className="text-amber-200">{props.hotkey}</span>}
        </button>
    );
}

export default Button;