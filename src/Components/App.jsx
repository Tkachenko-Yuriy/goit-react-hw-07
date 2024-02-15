import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { fetchContacts } from '../redux/operations';
import toast, { Toaster } from "react-hot-toast";
// import { addContact, deleteContact } from "../redux/contactsSlice";
// import { setFilter } from "../redux/filterSlice";
import Title from "./Title/Title";
// import ContactForm from "./ContactForm/ContactForm";
// import SearchBox from "./SearchForm/SearchBox";
import ContactList from "./ContactList/ContactList/ContactList";
import { selectContacts, selectFilter ,selectError, selectIsLoading } from '../redux/selectors';
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  console.log(contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // const handleDelete = (id) => {
  //   dispatch(deleteContact(id));
  // };

  // const handleFilterChange = (value) => {
  //   dispatch(setFilter(value));
  // };

  // const filteredContacts = contacts.filter((contact) => {
  //   const normalizeFilter = filter.toLowerCase();
  //   return contact.name.toLowerCase().includes(normalizeFilter);
  // });

  // const handleAddNewContact = (values) => {
  //   const uniqueContactName = contacts.some(
  //     (contact) => contact.name.toLowerCase() === values.name.toLowerCase()
  //   );
  //   const uniqueContactNumber = contacts.some(
  //     (contact) => contact.number === values.number
  //   );
  //   if (uniqueContactName && uniqueContactNumber) {
  //     toast.error("This contact is already in the contact book.");
  //     return;
  //   }
  //   if (uniqueContactNumber) {
  //     toast.error("This contact number is already in the contact book.");
  //     return;
  //   }
  //   dispatch(addContact(values));
  //   toast.success("Congratulations, the contact has been successfully added.");
  // };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Toaster />
      <Title text="Phonebook"></Title>
      {/* <ContactForm onChange={handleAddNewContact} /> */}
      {/* <SearchBox label="Find contacts by name" onChange={handleFilterChange} /> */}
      <ContactList items={contacts} />
      {/* <ContactList items={filteredContacts} onClick={handleDelete} /> */}
    </div>
  );
}

export default App;
