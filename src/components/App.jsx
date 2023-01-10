import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    this.setState({ contacts });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContactHandler = ({ name, number }) => {
    const { contacts } = this.state;

    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return true;
    }

    this.setState(prevState => ({
      contacts: [
        { id: nanoid(), name: name.trim(), number },
        ...prevState.contacts,
      ],
    }));
    return;
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  filteredContactsHandler = () => {
    const currentFilterValue = this.state.filter;
    return this.state.contacts.filter(item =>
      item.name.toLowerCase().includes(currentFilterValue.toLowerCase())
    );
  };

  changeFilterValue = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <>
        <div className={css.container}>
          <h2>Phonebook</h2>
          <ContactForm
            onSubmit={this.addContactHandler}
            contacts={contacts}
          ></ContactForm>
          <Filter value={filter} onChange={this.changeFilterValue} />
          <h2>Contacts:</h2>
          <ContactList
            contacts={this.filteredContactsHandler()}
            onDelete={this.deleteContact}
          />
        </div>
      </>
    );
  }
}

export default App;
