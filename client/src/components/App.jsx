/* eslint-disable object-curly-newline, no-shadow, no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemField from './ItemField';
import '../styles/App.css';

const App = (props) => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [outfitPiece, setOutfitPiece] = useState('');
  const [tags, setTags] = useState([]);
  const [lists, setLists] = useState([]);

  const fieldData = [
    { label: 'Name', id: 'name', value: name, setter: setName },
    { label: 'Notes', id: 'notes', value: notes, setter: setNotes },
    { label: 'Category', id: 'category', value: category, setter: setCategory },
    { label: 'Outfit Piece', id: 'outfitPiece', value: outfitPiece, setter: setOutfitPiece },
    { label: 'Tags', id: 'tags', value: tags, setter: setTags },
    { label: 'Add to Existing Lists', id: 'lists', value: lists, setter: setLists },
  ];

  const createItemBank = () => {
    axios({
      method: 'post',
      url: '/item-bank',
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  const getItems = () => {
    axios.get('/item-bank')
      .then(({ data: { items } }) => {
        if (items) {
          setItems(items);
        } else {
          createItemBank();
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getItems();
  }, [props]);

  const deleteItemBank = () => {
    axios({
      method: 'delete',
      url: '/item-bank',
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  const createItem = () => {
    axios({
      method: 'post',
      url: '/item',
      data: {
        name,
        notes,
        category,
        outfitPiece,
        tags,
        lists,
      },
    })
      .then(() => getItems())
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div>
        <button type="button" onClick={deleteItemBank}>Delete Item Bank (Start Over)</button>
      </div>
      Add item to item bank:
      {fieldData.map(({ label, id, value, setter }) => (
        <ItemField
          label={label}
          id={id}
          value={value}
          setter={setter}
          key={id}
        />
      ))}
      <button type="submit" onClick={createItem}>Create Item</button>
      <div>
        Item Bank:
        {items.map((item) => <div key={item._id}>{item.name}</div>)}
      </div>
    </div>
  );
};

export default App;
