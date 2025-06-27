// import { useEffect, useState } from "react";

// const useOnlineStatus=()=>{
//     const [OnlineStatus,setOnlineStatus]=useState(true);
//     useEffect(()=>{
//         window.addEventListener("offline", (event) => {

//             setOnlineStatus(false);
//         })
//         window.addEventListener("online", (event) => {

//             setOnlineStatus(true);
//         })


//     },[])
//     return OnlineStatus;
// }

// export default useOnlineStatus;


import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnlineStatus(true);
    const handleOffline = () => setOnlineStatus(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return onlineStatus;
};

export default useOnlineStatus;
