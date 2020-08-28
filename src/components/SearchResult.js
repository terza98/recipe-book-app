import React, {useState, useEffect} from 'react';

//bootstrap components
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';

//api
import Service from '../api/auth-service.js';

export default function Search(props){
    const [error, setError] = useState("");

    useEffect(() => {
            
    }, [] );

    return(
        <>
            <Container style={{margin: '10%'}} className="text-center">
                <h1 style={{marginBottom: '2%'}}>Search results for query: {props.query} </h1>
                {error &&
                    <Alert variant="danger" onClose={() => setError("")} dismissible>
                        {typeof error !== "object"? error: ''}
                    </Alert>
                }
                {props.recipes!==null &&
                    <Row>
                        {props.recipes.map((item,index)=>
                            <Col className="searchItem" key={index} xs={6} md={4}>
                                <Image src={item.image} rounded />
                                <h3>{item.title}</h3>
                            </Col>
                        )}
                    </Row>
                }
            </Container>
        </>
    )
}