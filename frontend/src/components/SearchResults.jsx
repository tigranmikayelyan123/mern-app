import React from 'react';
import SearchResult from './SearchResult';
import classes from './SearchResults.module.css';

function SearchResults({ results }) {
  return (
    <div className={classes['results-list']}>
      {
        results.map((result) => <SearchResult key={Math.random()} result={result} />)
      }
    </div>
  );
}

export default SearchResults;
