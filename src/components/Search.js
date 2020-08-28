import React from 'react';
import Container from 'react-bootstrap/Container'

export default function Search(props){
    return(
        <>
            <Container style={{margin: '10%'}} className="text-center">
                <h1>Welcome to my Recipes app!</h1>
                <p>Type your search inquiry below</p>
                <input type="text" id="search" name="search"/>
                <button>Search</button>
            </Container>
        </>
    )
}