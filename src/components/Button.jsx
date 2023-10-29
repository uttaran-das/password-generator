import PropTypes from 'prop-types'

function Button({ className, onClickFn, label }) {
    return (
        <button className={className} onClick={onClickFn}>{label}</button>
    )
}

Button.propTypes = {
    className: PropTypes.string,
    onClickFn: PropTypes.func,
    label: PropTypes.string
}

export default Button