import { Route, Routes } from 'react-router-dom';
import Layout from 'components/Layout';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<h1>Hello</h1>} />
      </Routes>
    </Layout>
  );
}
