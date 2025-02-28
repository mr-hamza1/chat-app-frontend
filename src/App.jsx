import React, { lazy, Suspense, useEffect} from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectRoute from './Components/auth/ProtectRoute';
import LayoutLoader from './Components/layout/Loader';
import { server } from './Components/constants/congfig.js';
import axios from 'axios';
import { useDispatch, useSelector} from 'react-redux'
import { userExists, userNotExists } from './redux/reducers/auth';
import { Toaster } from "react-hot-toast";
import { SocketProvider } from './socket.jsx';
import NotFound from './Pages/notFoundPage.jsx';

///Lazy Loading in React is a technique used to load components only when they are needed, rather than at the initial load of the application. This improves the performance of your app by reducing the initial bundle size.
const Home = lazy(() => import("./Pages/Home"))
const Chat = lazy(() => import("./Pages/Chat"))
const Groups = lazy(() => import("./Pages/Groups"))
const Login = lazy(() => import("./Pages/Login"))

const Adminlogin = lazy(() => import("./Pages/Admin/Adminlogin"))
const Dashboard = lazy(() => import("./Pages/Admin/Dashboard"))
const UserManagement = lazy(() => import("./Pages/Admin/UserManagement"));
const ChatManagement = lazy(() => import("./Pages/Admin/ChatManagement"));
const MessageManagement = lazy(() => import("./Pages/Admin/MessageManagement"));


const App = () => {
  const { user, loader } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
.get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch,user]);




  return loader? <LayoutLoader/> : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader/>}>
        <Routes>
          
          <Route element={
            <SocketProvider>
              <ProtectRoute user={user} />
            </SocketProvider>
          }>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:chatId" element={<Chat />} /> 
          <Route path="/groups" element={<Groups />} />
        </Route>
    
          
            <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />


        <Route path='/admin' element={<Adminlogin/>} />
        <Route path='/admin/dashboard' element={<Dashboard/>} />
        <Route path='/admin/users' element={<UserManagement/>} />
        <Route path='/admin/chats' element={<ChatManagement/>} />
        <Route path='/admin/messages' element={<MessageManagement/>} />
      
        <Route path='*' element={<NotFound />} />

      </Routes>
      </Suspense>
       
      <Toaster position="bottom-center" />

    </BrowserRouter>
  )
}

export default App