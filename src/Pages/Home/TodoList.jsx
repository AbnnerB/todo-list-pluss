import "./home.css";

import { useEffect, useState } from "react";

import { AiFillDelete, AiFillPlusCircle } from "react-icons/ai";
import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Home() {
  const [texts, setTexts] = useState("");
  const [id, setId] = useState(0);

  const [todoPlus, setTodoPlus] = useState(
    () => JSON.parse(localStorage.getItem("todoPlus")) || []
  );

  const [qntTodoTrueState, setQntTodoTrueState] = useState([]);

  useEffect(() => {
    //soluçao para o problema no id
    //quando a pagina recarregava o id voltava a 0, então se o usuario recarregasse a pagina e adicionasse mais 1 item na lista, esse item viria com o id 0, fazendo com q o id se repetisse

    let storedArray = JSON.parse(localStorage.getItem("todoPlus")) || [];
    let getId = storedArray.map((task) => {
      return task.id;
    });

    let lastId = getId[getId.length - 1];

    setId(lastId + 1 || 0);
  }, []);

  function addTodoWithEnter(event) {
    if (event.key === "Enter") {
      addTodo();
    }
  }

  function addTodo() {
    if (texts.length < 1) {
      alert("Preencha o campo de texto...");
      return;
    }

    const todoObj = {
      id: id,
      text: texts,
      checkedButton: false,
      dataDetails: [],
    };
    setId(id + 1);

    setTodoPlus([...todoPlus, todoObj]);

    setTexts("");
  }

  useEffect(() => {
    localStorage.setItem("todoPlus", JSON.stringify(todoPlus));
  }, [todoPlus]);

  function deleteItem(id) {
    const deleteOrCancel = window.confirm("Deseja realmente deletar este item");

    if (deleteOrCancel === false) {
      return;
    }

    let filtered = todoPlus.filter((todo) => todo.id !== id);
    setTodoPlus(filtered);

    localStorage.setItem("todoPlus", JSON.stringify(filtered));
  }

  function completeTask(id) {
    let mappingTask = todoPlus.map((todo) => {
      if (todo.id === id) {
        todo.checkedButton = !todo.checkedButton;
      }
      return todo;
    });
    setTodoPlus(mappingTask);
    localStorage.setItem("todoPlus", JSON.stringify(mappingTask));
  }
  useEffect(() => {
    setQntTodoTrueState(todoPlus.filter((todo) => todo.checkedButton === true));
  }, [todoPlus]);

  return (
    <div className="containerAll">
      <div className="containerMainContent">
        <h1 className="titleNotes">ANOTAÇÕES</h1>

        <div className="inputButton">
          <input
            type="text"
            maxLength="50"
            placeholder="Digite aqui..."
            value={texts}
            onChange={(e) => setTexts(e.target.value)}
            onKeyPress={addTodoWithEnter}
            autoFocus
          />

          <button onClick={addTodo}>
            <AiFillPlusCircle />
          </button>
        </div>

        {todoPlus.length > 0 && (
          <span className="tasksDone">
            Concluidos: {qntTodoTrueState.length} de {todoPlus.length}{" "}
          </span>
        )}
        <div className="containerList">
          {todoPlus.map((item, index) => (
            <div
              key={index}
              className="lista"
              style={item.checkedButton ? { order: "1" } : { order: "0" }}
            >
              <span className="checkedContent">
                <button
                  className="buttonChecked"
                  onClick={() => completeTask(item.id)}
                >
                  {item.checkedButton ? (
                    <BsCheckCircleFill />
                  ) : (
                    <BsCheckCircle />
                  )}
                </button>
                <p
                  className="textTodoList"
                  style={
                    item.checkedButton
                      ? { textDecoration: "line-through" }
                      : { textDecoration: "none" }
                  }
                >
                  {item.text}
                </p>
              </span>
              <button
                className="buttonDelete"
                onClick={() => deleteItem(item.id)}
              >
                <AiFillDelete />
              </button>
              <div className="linkForPageDetails">
                <Link to={`/details/${index}`}>...............</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
