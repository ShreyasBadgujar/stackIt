// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Header from './components/Header';
// import Sidebar from './components/Sidebar';
// import HomeScreen from './components/HomeScreen';
// import BrowseScreen from './components/BrowseScreen';
// import AskScreen from './components/AskScreen';
// import AnswersScreen from './components/AnswersScreen';
// import LoginPage from './components/LoginPage';
// import QuestionDetail from './components/QuestionDetail';
// const App = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     tags: ''
//   });

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-950">
//         <Header
//           isMobileMenuOpen={isMobileMenuOpen}
//           setIsMobileMenuOpen={setIsMobileMenuOpen}
//         />
//         <div className="flex">
//           <Sidebar />
//           <Routes>
//             <Route path="/" element={<HomeScreen />} />
//             <Route path="/browse" element={<BrowseScreen />} />
//             <Route
//               path="/ask"
//               element={
//                 <AskScreen
//                   formData={formData}
//                   handleInputChange={handleInputChange}
//                 />
//               }
//             />
//             <Route path="/question/:id" element={<AnswersScreen />} />
//             <Route path="/login" element={<LoginPage/>}/>
//             <Route path="*" element={<Navigate to="/" replace />} />
//             <Route path="/question/:id" element={<QuestionDetail />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomeScreen from './components/HomeScreen';
import BrowseScreen from './components/BrowseScreen';
import AskScreen from './components/AskScreen';
import LoginPage from './components/LoginPage';
import QuestionDetail from './components/QuestionDetail';


import ProtectedRoute from './components/ProtectedRoute';
import MyQuestions from './components/MyQuestions';

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-950">
        <Header
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <div className="flex">
          <Sidebar />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/browse" element={<BrowseScreen />} />
            <Route
              path="/ask"
              element={
                <AskScreen
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              }
            />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/question/:id" element={<QuestionDetail />} />
            <Route path="/answers" element={<ProtectedRoute><AnswersScreen /></ProtectedRoute>} />
            <Route path="/my-questions" element={<ProtectedRoute><MyQuestions /></ProtectedRoute>} />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
