import { useState } from "react";
import Footer from "./components/Footer";
import Main from "./components/Main";
import SideBar from "./components/SideBar";
import { useEffect } from "react";


function App() {

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(undefined);
  function handleToggleModal() {
    setShowModal(!showModal);
  }



  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      console.log(NASA_KEY)
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`

      const today = (new Date()).toDateString();
      const localKey = `NASA-${today}`;

      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey));
        setData(apiData);
        console.log('Fetched from LocalStorage')
        return;
      }

      localStorage.clear()

      try {
        const res = await fetch(url);
        const apiData = await res.json();
        localStorage.setItem(localKey, JSON.stringify(apiData));
        console('Fetched from API')
        setData(apiData);
        console.log(apiData);
      }
      catch (err) {
        console.log(err.message);
      }

    }
    fetchAPIData();
  }, [])


  return (
    <>
      {data ? <Main data={data} /> : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && <SideBar data={data} handleToggleModal={handleToggleModal} />}

      {data ? <Footer data={data} handleToggleModal={handleToggleModal} /> : <></>}

    </>
  )
}

export default App
