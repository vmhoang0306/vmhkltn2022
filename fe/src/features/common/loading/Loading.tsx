import './styles.css';
interface LoadingPropsI {
  style?: any;
}
function Loading(props: LoadingPropsI) {
  const { style } = props;
  return (
    <div className="loading-wrap" style={style}>
      <div className="loading-circle">
        <div className="outerCircle"></div>
        <div className="innerCircle"></div>
        <div className="icon-circle"></div>
      </div>
    </div>
  );
}

export default Loading;
