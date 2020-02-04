import React from 'react';
import Button from './Button';
import './SearchBox.css';

const SearchBox = ({ onSubmit, onChange }) => (
  <form onSubmit={onSubmit} onChange={onChange}>
    <input type="text" placeholder="Search..."></input>
    <Button type="submit" title="Search" />
  </form>
);

export default SearchBox;
