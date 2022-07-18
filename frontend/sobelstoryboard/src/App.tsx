import React, {useCallback, useMemo, useState} from 'react';
// import logo from './logo.svg';
import './App.css';
// import {FileUploader} from "./upload/Uploader";

import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import {ProcessStoryboard} from "./process/ProcessStoryboard";
import {DownloadStoryboard} from "./download/DownloadStoryboard";
import {useAppSelector} from "./app/hooks";
import {ProduceZipInput} from "./download/DownloadStoryboardAPI";
import {ExampleButton} from "./buttons/ExampleButton";
import {ClearButton} from "./buttons/ClearButton";
import {NewOverlay, Overlay} from "./app/NewOverlay";
import {FileUploader} from "./upload/Uploader";

function App() {
  // const onUpComp = () => {
  //   console.log('bbb');
  // };
  const folder =  useAppSelector(state => state.pushFountain.uniqueNumber);
  const expected = useAppSelector(state => state.pushFountain.numExpected);
  const dVals = useAppSelector(state => state.downloadStoryboard);
  const fVals = useAppSelector(state => state.pushFountain);
  const currentlyDownloading = useAppSelector(state => state.downloadStoryboard.currentlyDownloading);
    // const [appState, setAppState] = useState('NORMAL');
  const [fountainText, setFountainText] = useState('');
  const zpUrlValue = useMemo<ProduceZipInput>(() =>
      ({ folder: folder ?? '', expected,
          zipFileName: 'output'}), [folder, expected])
  const triggerProcess = () => {
      console.log('trigger process: ');
      // call push_fountain_to_queue
      // change the app state
  };
  return (
    <div className="App">

        <NewOverlay
            marginTop="0px"
            fadeSpeed={500}
            onClick={() => null}
            active={currentlyDownloading}
            state={'entering'}
        >
            {expected === 0 ? (<Row>Parsing....</Row>) : null}
            {fVals.error ? (<Row>PARSING ERROR: {fVals.error ?? 'none'}</Row>) : null}
            {dVals.error ? (<Row>DOWNLOAD & ZIP ERROR: {dVals.error ?? 'none'}</Row>) : null}
            {expected > 0 ? (<Row>Parsed! Processing {dVals.numProcessed} / {expected}</Row>) : null}
        </NewOverlay>
        <Container>
            <Row sm={1} md={2} lg={2}>
                <Card>
                    <CardHeader>
                        Screenplay Input
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="exampleText">
                                    Text Area
                                </Label>
                                <Input
                                    style={{ height: '400px' }}
                                    value={fountainText}
                                    onChange={event => setFountainText(event.target.value)}
                                    id="exampleText"
                                    name="text"
                                    type="textarea"
                                />
                            </FormGroup>
                            <FileUploader fileTypes={[]} onUploadComplete={vv => setFountainText(vv)}></FileUploader>
                            {/*<Button>*/}
                            {/*    Process*/}
                            {/*</Button>*/}
                        </Form>
                        <Row>
                            <Col>
                                <ExampleButton fText={fountainText} uponOutput={setFountainText} />
                            </Col>
                            <Col>
                                <ClearButton fText={fountainText} uponOutput={setFountainText} />
                            </Col>
                        </Row>
                        {/*<input type={'textarea'}/>*/}
                    </CardBody>
                </Card>
                {/*   Image Display*/}
                <Card>
                    <CardHeader>
                        Storyboard Output
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <ProcessStoryboard fText={fountainText} uponOutput={triggerProcess}/>
                        </Row>
                        <Row>FOLDER: {folder ?? 'none yet'}</Row>
                        <Row>NUMBER EXPECTED: {expected}</Row>
                        <Row>PARSING STATUS: {fVals.status}</Row>
                        <Row>PARSING ERROR: {fVals.error ?? 'none'}</Row>
                        <Row>
                            {folder == null ? null : (
                                <DownloadStoryboard toZipUrl={zpUrlValue} />
                            )}
                        </Row>
                        <Row>DOWNLOAD & ZIP STATUS: {dVals.status}</Row>
                        <Row>URL: {dVals.url ?? 'none yet'}</Row>
                        {/*<Row>NUMBER EXPECTED: {dVals.numExpected}</Row>*/}
                        <Row>NUMBER PROCESSED: {dVals.numProcessed}</Row>
                        <Row>DOWNLOAD & ZIP ERROR: {dVals.error ?? 'none'}</Row>
                        <Row>DOWNLOADING: {currentlyDownloading ? 'TRUE' : 'FALSE'}</Row>

                    </CardBody>
                </Card>

            </Row>
        </Container>
      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.tsx</code> and save to reload.*/}
      {/*  </p>*/}
      {/*  <a*/}
      {/*    className="App-link"*/}
      {/*    href="https://reactjs.org"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn React*/}
      {/*  </a>*/}
      {/*</header>*/}
    </div>
  );
}

export default App;
