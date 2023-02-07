import "../css/Message.css";
function Message(props){
    return(
        <div className="message-parent">
            <i className="fa-solid fa-info-circle"></i>
            <span> { props.displayMessage } </span>
        </div>
    )
}

export default Message;