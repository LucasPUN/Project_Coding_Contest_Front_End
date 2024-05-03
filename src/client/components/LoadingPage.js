import {Col, Form, FormGroup, Grid} from 'react-bootstrap';
import React from 'react';


export default function LoadingPage() {

    return (
        <>
            {
                <div

                    style={{
                        display: 'flex',
                        marginBottom: '100px',
                        marginLeft: '20px'
                    }}
                >
                    <div
                        style={{
                            marginLeft: '20px'
                        }}
                    >
                        <div
                            style={{
                                width: '45vw',
                                maxHeight: '75vh',
                                overflow: 'auto',
                                color: 'black',
                                fontSize: 20
                            }}
                        >
                            {Array.from({length: 15}).map(() => (
                                <p className="placeholder-glow">
                                    <span className="placeholder col-12"/>
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="container">
                        <Form horizontal>
                            <FormGroup controlId="code">
                                <Col sm={12}>
                                    <p className="placeholder-glow">
                                        <span className="placeholder col-1"/>
                                    </p>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="code">
                                <Col sm={12}>
                                    <p className="placeholder-glow" style={{height: '250px', width: '250px'}}>
                                            <span className="placeholder col-3"
                                                  style={{height: '250px', width: '50vw'}}/>
                                    </p>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={5}>
                                    <Grid className="col-md-6">
                                        <p className="placeholder-glow">
                                            <span className="placeholder col-6"/>
                                        </p>
                                    </Grid>
                                    <Grid className="col-md-6">
                                        <p className="placeholder-glow">
                                            <span className="placeholder col-6"/>
                                        </p>
                                    </Grid>
                                    <Grid className="col-md-6"/>
                                </Col>
                                <Col sm={10}/>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={12}/>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={12}>
                                    <p className="placeholder-glow" style={{height: '250px', width: '250px'}}>
                                            <span className="placeholder col-3"
                                                  style={{height: '250px', width: '50vw'}}/>
                                    </p>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>

            }
        </>
    );
}