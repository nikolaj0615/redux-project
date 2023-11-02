import React, { useEffect, useState } from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { importData, } from './redux/import/importSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import FileInput from './components/importFiles';
import TreeView from './components/treeView';
import { IconArrowLeft, IconDownload } from '@tabler/icons-react';

function App() {
  const dispatch = useDispatch();
  const importedData = useSelector((state: RootState) => state.import.data);
  const [showTreeView, setShowTreeView] = useState(false);
  console.log(importedData);

  useEffect(() => {
    const storedData = localStorage.getItem('reduxState');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      dispatch(importData(parsedData));
      setShowTreeView(true);
    }
  }, [dispatch]);

  const handleBackToUpload = () => {
    localStorage.removeItem('reduxState');
    setShowTreeView(false);
  };

  const handleExportFile = () => {
    const reduxState = importedData;
    const jsonState = JSON.stringify(reduxState);
    const blob = new Blob([jsonState], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newPlayer.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Container>
      <Row className={`d-flex h-95 justify-content-center ${showTreeView && 'd-none'} align-items-center`}>
        <Col className="d-flex flex-column align-items-center justify-content-center" md={8}>
          <h1 className='text-white w-100 text-center mb-5'>Basketball player statistics presentation</h1>
          <FileInput setShowTreeView={setShowTreeView} showTreeView={showTreeView} />
        </Col>
      </Row>
      <Row className='justify-content-between'>
        {
          showTreeView && importedData && (
            <>
              <div className='d-flex align-items-center mb-5 mt-4 justify-content-between'>
                <div onClick={handleBackToUpload} className="d-flex cursor-pointer text-white align-items-center">
                  <IconArrowLeft className='me-2' />
                  Back to upload
                </div>
                <div onClick={handleExportFile} className="d-flex cursor-pointer text-white align-items-center">
                  Export file
                  <IconDownload className='ms-2' />
                </div>
              </div>
              <Col md={12}>
                <TreeView importedData={importedData} />
              </Col>
            </>
          )
        }
      </Row>
    </Container>
  );
}

export default App;
