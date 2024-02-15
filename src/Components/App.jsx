import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { fetchContacts, addContact, deleteContact } from "../redux/operations";
import {
  selectContacts,
  selectFilter,
  selectError,
  selectIsLoading,
} from "../redux/selectors";
import { setFilter } from "../redux/filterSlice";
import Title from "./Title/Title";
import ContactForm from "./ContactForm/ContactForm";
import SearchBox from "./SearchForm/SearchBox";
import ContactList from "./ContactList/ContactList/ContactList";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = (value) => {
    dispatch(setFilter(value));
  };

  const filteredContacts = contacts.filter((contact) => {
    const normalizeFilter = filter.toLowerCase();
    return contact.name.toLowerCase().includes(normalizeFilter);
  });

  const handleAddNewContact = (values) => {
    const uniqueContactName = contacts.some(
      (contact) => contact.name.toLowerCase() === values.name.toLowerCase()
    );
    const uniqueContactPhone = contacts.some(
      (contact) => contact.phone === values.phone
    );
    if (uniqueContactName && uniqueContactPhone) {
      toast.error("This contact is already in the contact book.");
      return;
    }
    if (uniqueContactPhone) {
      toast.error("This contact number is already in the contact book.");
      return;
    }
    dispatch(addContact(values));
    toast.success("Congratulations, the contact has been successfully added.");
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Toaster />
      <Title text="Phonebook"></Title>
      <ContactForm onChange={handleAddNewContact} />
      <SearchBox label="Find contacts by name" onChange={handleFilterChange} />
      {isLoading && !error && <b>Request in progress...</b>}
      <ContactList items={filteredContacts} onClick={handleDelete} />
    </div>
  );
}

export default App;
