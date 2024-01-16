const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    const { display, isError } = message;

    return (
        <div className={isError ? 'error' : 'good'}>
            {display}
        </div>
    )
}

export default Notification