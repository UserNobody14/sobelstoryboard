import React from 'react';
import logo from './logo.svg';
import './App.css';
import {FileUploader} from "./upload/Uploader";

import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, CardBody, CardHeader, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";

function App() {
  const onUpComp = () => {
    console.log('bbb');
  };
  return (
    <div className="App">
        <Container>
            <Row md={2}>
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
                                    id="exampleText"
                                    name="text"
                                    type="textarea"
                                />
                            </FormGroup>
                            <FileUploader fileTypes={[]} onUploadComplete={onUpComp}></FileUploader>
                            <Button>
                                Process
                            </Button>
                        </Form>
                        {/*<input type={'textarea'}/>*/}
                    </CardBody>
                </Card>
                {/*   Image Display*/}
                <Card>
                    <CardHeader>
                        Storyboard Output
                    </CardHeader>

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
