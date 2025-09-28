interface ListItemProps {
  item: string;
  buttonText: string;
  buttonClassName : string;
  onClick: () => void;
}

function ListItem({ item, buttonText, buttonClassName, onClick }: ListItemProps) {
  return(<>
    <p className="todo-container__list-element-text">{item}</p>
    <button className={buttonClassName} onClick={onClick}>{buttonText}</button>
  </>)
}

export default ListItem;
