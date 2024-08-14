import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainNavbar from "./components/MainNavbar"
import PageLoader from "./components/PageLoader/PageLoader"
import ReelsDetails from "./components/ReelsDetails/ReelsDetails"
import VideoDetails from "./components/VideoDetails/VideoDetails"
import SocailIcons from "./utils/SocailIcons/SocailIcons"

import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import { GetData } from "./api/Axios/useGetData"

import ReelsSection from "./components/ReelsSection/ReelsSection"
import AdminAddReels from "./pages/admin/AdminAddReels/AdminAddReels"
import AdminAllContact from "./pages/admin/AdminAllContact/AdminAllContact"
import AdminAllWork from "./pages/admin/AdminAllWork/AdminAllWork"
import AdminHome from "./pages/admin/AdminHome/AdminHome"
import AdminReels from "./pages/admin/AdminReels/AdminReels"
import AdminUpdateReels from "./pages/admin/AdminUpdateReels/AdminUpdateReels"
import AdminUpdateWork from "./pages/admin/AdminUpdateWork/AdminUpdateWork"
import AdminWork from "./pages/admin/AdminWork/AdminWork"
import LoginPage from "./pages/LoginPage/LoginPage"
import BiographyPage from "./pages/users/BiographyPage/BiographyPage"
import ContactPage from "./pages/users/ContactPage/ContactPage"
import DiaryPage from "./pages/users/DiaryPage/DiaryPage"
import HomePage from "./pages/users/HomePage/HomePage"
import WordPage from "./pages/users/WorkPage/WorkPage"
import ChangeDirectRoute from "./utils/Protect Routes/ChangeDirectRoute"
import ProtectedRoute from "./utils/Protect Routes/ProtectedRoute"
import notify from "./utils/useToastify"

const App = () => {
  const [dataLoading, setDataLoading] = useState(false);
  const [allData, setAllData] = useState([]);

  const getAllData = () => {
    GetData(`/api/v1/userInfo`).then(res => {
      const myData = res.data
      localStorage.setItem('dataId', myData.data[0]._id)
      setAllData(myData)
      setDataLoading(true)
    }).catch(err => {
      notify(err || err.response.data.msg || err.response.data.message || err.response.data.errors[0].msg, 'error')
    });
  }

  useEffect(() => {
    getAllData()
  }, [])

  const [isAdmin, isLogged] = ProtectedRoute();

  return (
    <>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <SocailIcons allData={allData} />
        <PageLoader dataLoading={dataLoading} />
        <MainNavbar />
        <div className="main-cover1 rounded-5 my-3 d-inline-block w-100">
          <div id='container'>
            <Routes>
              <Route path="/" element={<HomePage allData={allData} />} />
              <Route path="/work" element={<WordPage />} />
              <Route path="/work/:id" element={<VideoDetails />} />
              <Route path="/diary" element={<DiaryPage allData={allData} dataLoading={dataLoading} />} />
              <Route path="/biography" element={<BiographyPage allData={allData} />} />
              <Route path="/contact" element={<ContactPage allData={allData} />} />
              <Route path="/reel/:id" element={<ReelsDetails />} />
              <Route path="/allReels" element={<ReelsSection />} />

              <Route element={<ChangeDirectRoute auth={isAdmin} />}>
                <Route path="/admin" element={<AdminHome />} />
                <Route path="/admin/work" element={<AdminWork />} />
                <Route path="/admin/allWork" element={<AdminAllWork />} />
                <Route path="/admin/updateWork/:id" element={<AdminUpdateWork />} />
                <Route path="/admin/allContact" element={<AdminAllContact />} />
                {/* <Route path="/admin/diary" element={<AdminDiary />} /> */}
                <Route path="/admin/reels" element={<AdminReels />} />
                <Route path="/admin/updateReels/:id" element={<AdminUpdateReels />} />
                <Route path="/admin/addReels" element={<AdminAddReels />} />
              </Route>

              <Route element={<ChangeDirectRoute auth={isLogged} />}>
                <Route path="/login" element={<LoginPage />} />
              </Route>
            </Routes>
          </div>
        </div>
        <ToastContainer />
      </BrowserRouter>
      {/* <Row className="justify-content-center pb-3">
        Copyright © 2036 Cyborg Gaming Company. All rights reserved.
      </Row> */}
    </>
  )
}

export default App