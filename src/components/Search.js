import React, {useState, useEffect} from 'react';

//bootstrap components
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';

//api
import Service from '../api/auth-service.js';

//componets
import SearchResult from './SearchResult.js';

export default function Search(props){
    const [query, changeQuery] = useState("");
    const [error, setError] = useState("");

    const [predictions, setPredictions] = useState([]);

    const [recipeList, setRecipes] = useState([]);
    const [showRecipes, isRecipes] = useState(false);

    useEffect(() => {
            
    }, [] );

    const handleInputChange = (e) => {
        changeQuery(e.target.value);

        Service.autoCompleteSearch(e.target.value)
            .then(
                (result) => {
                    setPredictions(result.data);
                },
                // Note: hanling errors here
                (error) => {
                    setError(error.message);
                }
            )
    }
    const selectQuery = (title) => {
        changeQuery(title);
        setPredictions([]);
        console.log(title);
    }
    const loadResults = () => {
        Service.searchRecipes(query)
        .then(
            (result) => {
                console.log(result.data.results);
                setRecipes(result.data.results);
                isRecipes(true);
            },
            // Note: hanling errors here
            (error) => {
                setError(error.message);
            }
        )
    }
    return(
        <>
            {!showRecipes? 
            <Container style={{margin: '10%'}} className="text-center">
                <h1>Welcome to my Recipes app!</h1>
                <p>Type your search inquiry below</p>
                {error &&
                    <Alert variant="danger" onClose={() => setError("")} dismissible>
                        {typeof error !== "object"? error: ''}
                    </Alert>
                }
                <div id="autocomplete-list">
                    <input onChange={(e) => handleInputChange(e)} value={query} type="text" id="search" name="search"/>
                    <ListGroup>
                        {predictions!==undefined && predictions.map( (item,index) =>
                            <ListGroup.Item onClick={() => selectQuery(item.title)} key={index}>{item.title}</ListGroup.Item>
                        )}
                    </ListGroup>
                </div>
                <button id="search-btn" onClick={loadResults}>Search</button>
            </Container>
            :
                <SearchResult query={query} recipes={recipeList}/>
            }
        </>
    )
}