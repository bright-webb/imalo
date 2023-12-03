
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './components/Index/Index';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Verify from './components/Verify/Verify';
import Account from './components/Account/Account';
import PostProperty from './components/PostProperty/PostProperty';
import DownloadApp from './components/DownloadApp/DownloadApp';
import UploadPropertyImages from './components/UploadPropertyImages/UploadPropertyImages';
import Preview from './components/Preview/Preview';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/account" element={<Account />} />
          <Route path="/post-property" element={<PostProperty />} />
          <Route path="/download-app" element={<DownloadApp />} />
          <Route path="/upload-photos" element={<UploadPropertyImages />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
    </Router>
  );
}

export default App;
