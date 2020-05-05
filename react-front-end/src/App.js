
import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import './App.css';

const useStyles = makeStyles((theme) => ({
  button: {
    height: '3.5em',
    marginLeft: '2vw',
    width: '10vw'
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  inline: {
    display: 'inline',
  },
  root: {
    flexGrow: 1,
  },
  select: {
    height: '3.5em',
    marginLeft: '2vw',
    marginTop: '2vh',
    width: '25vw'
  },
  textField: {
    height: '3.5em',
    marginTop: '1.45em',
    width: '45vw',
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function App() {
  // State variables that will determine when the UI changes
  const [formError, setFormError] = useState(false);
  const [searchEngine, setSearchEngine] = useState("bing")
  const [searchValue, setSearchValue] = useState("");
  const [resultComponents, setResultComponenets] = useState([]);
  const [requestError, setRequestError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const classes = useStyles();

  function handleResult(engine, items){
    setSearchEngine(engine);
    console.log("ENGINE CHANGE:", engine);
    console.log("ITEMS:", items)
    if (items === "ERROR"){
      setRequestError(true)
    } else {
      const resultArray = []
      for (let i in items){
        console.log("ITEM:", items[i]);
        resultArray.push(items[i]);
      }
      setIsLoading(false);
      setResultComponenets(resultArray);
    }
  }

  function handleSubmit(event){
    if (!searchValue){
      setFormError(true);
      return;
    }
    event.preventDefault();
    // Clear the results
    setResultComponenets([]);
    setFormError(false);
    setRequestError(false);
    setIsLoading(true);
    const formData = {
      searchEngine: searchEngine,
      searchText: searchValue
    };
    fetch('/search', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(formData),
    })
    .then(res => res.json())
    .then(response => handleResult(response['engine'], response['result']));
  }

  const handleSelect = (event) => {
    setSearchEngine(event.target.value);
  }

  const handleTextChanged = (event) => {
    setSearchValue(event.target.value);
  }

  // This allows users to press enter when in the text input field
  const onEnterPress = (e) => {
    if(e.keyCode === 13 && e.shiftKey === false) {
      handleSubmit(e);
    }
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="m">
        <Grid container spacing={3} className={classes.inline}>
          <Grid item>
            <TextField
              id="seach-button"
              name="searchText"
              label="Enter your search here"
              error={formError}
              helperText={formError && "Please enter something to search for"}
              className={classes.textField}
              onChange={handleTextChanged}
              onKeyDown={onEnterPress}
            />
            <Select
              autoWidth
              value={searchEngine}
              onChange={handleSelect}
              className={classes.select}
            >
              <MenuItem value="bing">Bing</MenuItem>
              <MenuItem value='ebay'>eBay</MenuItem>
              <MenuItem value="googlenews">Google News</MenuItem>
              <MenuItem value="reddit">Reddit</MenuItem>
              <MenuItem value="stackoverflow">Stack Overflow tags</MenuItem>
            </Select>
            <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>Search!</Button>
          </Grid>
        </Grid>
        <div>
          {requestError ? (
            <List>
              <ListItem disabled>
                <ListItemLink>
                  <ListItemText
                    primary="Sorry, there was an error getting the result" secondary="Please try again." />
                </ListItemLink>
              </ListItem>
          </List>
          )
          : isLoading && (
            <List>
              <ListItem disabled>
                <ListItemLink>
                  <ListItemText
                    primary="Loading results..." secondary="Please wait." />
                  </ListItemLink>
              </ListItem>
          </List>
          )}
          {resultComponents && (
            <List style={{width: '100%'}}>
              {resultComponents.map(result =>
                <>
                  <Divider variant="inset" />
                  <ListItem>
                    <ListItemLink href={result.link}>
                      <ListItemText primary={result.title} secondary=
                        {<React.Fragment>
                          <Grid container spacing={3}>
                            <Grid item xs={10}>
                              <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                              >
                                <div>
                                  { result && result.summary }
                                </div>
                              </Typography>
                              <Grid item>
                                Posted {result.published}
                              </Grid>
                            </Grid>
                          </Grid>
                        </React.Fragment>}
                      />
                    </ListItemLink>
                  </ListItem>
                </>
              )}
            </List>
          )}
        </div>
      </Container>
    </div>
  );
}

export default App;
