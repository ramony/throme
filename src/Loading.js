import './Loading.css';

const Loading = props => {
  let { visible } = props;
  if (!visible) {
    return <></>
  }
  return (
    <figure>
      <div className="dot white"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </figure>
  )

}

export default Loading