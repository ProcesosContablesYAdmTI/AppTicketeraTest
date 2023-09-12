import React from 'react'
import History from '../components/History/History'
import Form from '../components/Form/FormApp'
import NavBar from '../components/NavBar/NavBar'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import ChatWindow from '../components/ChatWindow/ChatWindow'
import HistoryDetail from '../components/HistoryDetail/HistoryDetail'
import LayoutNav from '../components/LayoutNav/LayoutNav'
import Home from '../components/Home/Home'

 
function RoutesApp() {

  return (
    // <HashRouter>
    //   <NavBar/>
    //     <div 
    //       style={{
    //       minHeight: '100vh',
    //       padding: 20
    //       }}
    //     >
    //       <Routes>
    //         <Route path="/" element={<Navigate to="/form" replace />} />
    //         <Route path="/form" element={<Form />} />
    //         <Route path="/history" element={<History />} />
    //         <Route path="/chat" element={<ChatWindow/>} />
    //         <Route path="/history/detail/:id" element={<HistoryDetail/>} />
    //       </Routes>
    //     </div>
    // </HashRouter>

      <HashRouter>
          <Routes>
            <Route path="/" element={<LayoutNav/>}>
              <Route path="/" element={<Home />} />
              <Route path="form" element={<Form />} />
              <Route path="/history" element={<History />} />
              <Route path="/chat" element={<ChatWindow/>} />
            </Route>
            {/* <Route path="/form" element={<Form />} />
            <Route path="/history" element={<History />} />
            <Route path="/chat" element={<ChatWindow/>} />
            <Route path="/history/detail/:id" element={<HistoryDetail/>} /> */}
          </Routes>
        
    </HashRouter>

  //   <HashRouter>
  //   <Routes>
  //     <Route
  //       path="/"
  //       element={
  //         <LayoutNav>
  //           {/* Componente predeterminado para la ruta raíz */}
  //           <Form />
  //         </LayoutNav>
  //       }
  //     />
  //     <Route
  //       path="/form"
  //       element={
  //         <LayoutNav>
  //           <Form />
  //         </LayoutNav>
  //       }
  //     />
  //     <Route
  //       path="/history"
  //       element={
  //         <LayoutNav>
  //           <History />
  //         </LayoutNav>
  //       }
  //     />
  //     <Route
  //       path="/chat"
  //       element={
  //         <LayoutNav>
  //           <ChatWindow />
  //         </LayoutNav>
  //       }
  //     />
  //     <Route
  //       path="/history/detail/:id"
  //       element={
  //         <LayoutNav>
  //           <HistoryDetail />
  //         </LayoutNav>
  //       }
  //     />
  //   </Routes>
  // </HashRouter>

  // <HashRouter>
  //     <Routes>
  //       <Route
  //         path="/"
  //         element={<LayoutNav contentComponent={<Form />} />}
  //       />
  //       <Route
  //         path="/form"
  //         element={<LayoutNav contentComponent={<Form />} />}
  //       />
  //       <Route
  //         path="/history"
  //         element={<LayoutNav contentComponent={<History />} />}
  //       />
  //       <Route
  //         path="/chat"
  //         element={<LayoutNav contentComponent={<ChatWindow />} />}
  //       />
  //       <Route
  //         path="/history/detail/:id"
  //         element={<LayoutNav contentComponent={<HistoryDetail />} />}
  //       />
  //     </Routes>
  //   </HashRouter>


  )
}

export default RoutesApp