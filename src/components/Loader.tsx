

// function Loader({message}:{message:string}) {
//   return (
//     <div className="text-center py-6">
//       <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto">
//         <p className="text-gray-500 mt-2">{ message}</p>
//       </div>
//     </div>
    
//   );
// }

// export default Loader;

function Loader({message}:{message:string}) {
  return (
    <div className="loader">
      <div className="loader-spinner"></div>
      <p className="loader-text">{ message }</p>
    </div>
  );
}

export default Loader;
