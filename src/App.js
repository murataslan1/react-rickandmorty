import {BrowserRouter, Routes, Route} from 'react-router-dom'

import {Home, Detail, NotFound} from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={'/'} element={<Home />} />
        <Route path={'/character/:characterId'} element={<Detail/>} />
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
