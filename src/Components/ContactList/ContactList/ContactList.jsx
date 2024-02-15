import Contact from "../Contact/Contact";
import Button from "../../Button/Button";
import css from "./ContactList.module.css";

export default function ContactList({ items, onClick }) {
  return (
    <ul className={css.list}>
      {items.map(({ id, name, phone }) => (
        <li key={id} className={css.item}>
          <Contact name={name} number={phone}>
            <Button text="Delete" type="button" onClick={() => onClick(id)} />
          </Contact>
        </li>
      ))}
    </ul>
  );
}
