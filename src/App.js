import { Container } from 'react-bootstrap';
import Home from './components/pages/Home/Home';
import Footer from './components/views/Footer/Footer';
import NotFound from './components/pages/NotFound/NotFound';
import Table from './components/pages/Table/Table';
import { Routes, Route } from 'react-router-dom';
import Header from './components/views/Header/Header';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchTables } from './redux/tablesRedux';
import { removeTableRequest } from './redux/tablesRedux';
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchTables()), [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/tables" element={<Home />}/>
        <Route path='/table' element={<Table />} />
        <Route path='/table/:tableId' element={<Table />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;
