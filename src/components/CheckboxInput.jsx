import PropTypes from 'prop-types'

function CheckboxInput({ id, defaultChecked, onChangeFn, label }) {
    return (
        <div className='flex items-center gap-x-1'>
            <input type="checkbox" name="" id={id} defaultChecked={defaultChecked}
                onChange={() => onChangeFn(prev => !prev)} />
            <label htmlFor="numberInput">{label}</label>
        </div>
    )
}

CheckboxInput.propTypes = {
    id: PropTypes.string,
    defaultChecked: PropTypes.bool,
    onChangeFn: PropTypes.func,
    label: PropTypes.string
}

export default CheckboxInput