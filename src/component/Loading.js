import '@/component/Loading.css';

const Loading = ({ visible }) => {
  if (!visible) {
    return <></>
  }
  return (
    <figure className="loading">
      <div className="dot white"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </figure>
  )

}

export default Loading