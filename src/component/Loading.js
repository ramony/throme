import '@/component/Loading.css';

const Loading = ({ visible }) => {
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