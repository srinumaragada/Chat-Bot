import "./App.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './Components/Registration';
import SetupOrg from './Components/SetupOrg';
import WebsiteScan from './Components/WebsiteScan';
import Integration from './Components/Integration';
import TestChat from './Components/testChat';
import AdminPanel from "./Components/AdminPanel";
function App() {
 
  return (
   
      <div className="App">
       
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/organization-setup" element={<SetupOrg />} />
          <Route path="/website-scan" element={<WebsiteScan />} />
          <Route path="/integration" element={<Integration />} />
          <Route path="/test-chat" element={<TestChat />} />
          <Route path="/AdminPanel" element={<AdminPanel />} />
        </Routes>
      </div>
  
  );
}

export default App;
