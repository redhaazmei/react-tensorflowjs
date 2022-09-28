import { Route, Routes } from 'react-router-dom';
import Layout from 'components/Layout';
import SimpleFaceDetection from 'pages/SimpleFaceDetection.mdx';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SimpleFaceDetection />} />
      </Routes>
    </Layout>
  );
}
