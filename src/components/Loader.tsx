
function Loader({message}:{message:string}) {
  return (
    <div className="loader">
      <div className="loader-spinner"></div>
      <p className="loader-text">{ message }</p>
    </div>
  );
}

export default Loader;
