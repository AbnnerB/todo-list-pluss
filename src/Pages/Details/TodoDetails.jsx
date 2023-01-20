import "./Details.css";

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { BsPencilFill, BsListUl, BsTextParagraph } from "react-icons/bs";
import { MdTitle } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { FiDelete } from "react-icons/fi";
import { IoArrowUndoSharp } from "react-icons/io5";

export default function TodoDetails() {
  const idUrl = useParams();
  const idUrlNumber = parseInt(idUrl.id);

  const [showModalComponent, setShowModalComponent] = useState(false);
  const [showButtonsDeleteContent, setShowButtonsDeleteContent] =
    useState(false);

  const [valueInputModal, setValueInputModal] = useState("");
  const [typeValueInputModal, setTypeValueInputModal] = useState("T");

  const getArrayFromLocalStorage = JSON.parse(
    localStorage.getItem("todoPlus") || []
  );

  if (idUrlNumber + 1 > getArrayFromLocalStorage.length) {
    window.location.pathname = "/";
  }

  const [arrayDetailsPage, setArrayDetailsPage] = useState(
    getArrayFromLocalStorage[idUrlNumber].dataDetails || []
  );

  const [id, setId] = useState(0);

  useEffect(() => {
    let storedArray = JSON.parse(localStorage.getItem("todoPlus")) || [];

    let storedInfoArray = storedArray[idUrlNumber].dataDetails;

    let getId = storedInfoArray.map((task) => {
      return task.id;
    });

    let lastId = getId[getId.length - 1];

    setId(lastId + 1 || 0);
  }, [idUrlNumber]);

  function addContent() {
    const obj = {
      value: valueInputModal,
      typeValue: typeValueInputModal,
      id: id,
    };
    setId(id + 1);

    setArrayDetailsPage([...arrayDetailsPage, obj]);

    setValueInputModal("");
    setShowModalComponent(false);

    getArrayFromLocalStorage[idUrlNumber].dataDetails = arrayDetailsPage;

    localStorage.setItem("todoPlus", JSON.stringify(getArrayFromLocalStorage));
  }

  function deleteInfo(id) {
    let confirmDelete = window.confirm("Deseja realmente deletar este item?");

    if (!confirmDelete) {
      return;
    }

    let filtered = arrayDetailsPage.filter((line) => line.id !== id);
    setArrayDetailsPage(filtered);
    getArrayFromLocalStorage[idUrlNumber].dataDetails = arrayDetailsPage;
    localStorage.setItem("todoPlus", JSON.stringify(getArrayFromLocalStorage));
  }

  useEffect(() => {
    getArrayFromLocalStorage[idUrlNumber].dataDetails = arrayDetailsPage;

    localStorage.setItem("todoPlus", JSON.stringify(getArrayFromLocalStorage));
  }, [arrayDetailsPage, getArrayFromLocalStorage, idUrlNumber]);

  return (
    <div className="PageDetails">
      <Link title="voltar a pagina inicial" to="/" className="linkReturn">
        <IoArrowUndoSharp />
      </Link>

      <h1>{getArrayFromLocalStorage[idUrlNumber].text}</h1>

      <article
        style={showModalComponent ? { display: "block" } : { display: "none" }}
        className="showModalContent"
      >
        <div className="containerModal">
          <div className="modalContainerBtnsTypeContents">
            <button
              className="btnModal"
              title="Título"
              style={
                typeValueInputModal === "T"
                  ? { backgroundColor: "#435792" }
                  : { backgroundColor: "#7898e4" }
              }
              onClick={() => setTypeValueInputModal("T")}
            >
              <MdTitle />
            </button>
            <button
              className="btnModal"
              title="Parágrafos"
              style={
                typeValueInputModal === "P"
                  ? { backgroundColor: "#435792" }
                  : { backgroundColor: "#7898e4" }
              }
              onClick={() => setTypeValueInputModal("P")}
            >
              <BsTextParagraph />
            </button>
            <button
              className="btnModal"
              title="Listas"
              style={
                typeValueInputModal === "L"
                  ? { backgroundColor: "#435792" }
                  : { backgroundColor: "#7898e4" }
              }
              onClick={() => setTypeValueInputModal("L")}
            >
              <BsListUl />
            </button>
          </div>

          <textarea
            rows="6"
            onChange={(e) => setValueInputModal(e.target.value)}
            value={valueInputModal}
          />

          <div className="bntsModalAddCancell">
            <button onClick={addContent}>Adicionar</button>
            <button onClick={() => setShowModalComponent(false)}>
              Cancelar
            </button>
          </div>
        </div>
      </article>

      <section className="contentPrincipal">
        <div className="buttonsAddOrDelete">
          <button onClick={() => setShowModalComponent(true)}>
            <BsPencilFill />
          </button>
          <button
            onClick={() =>
              setShowButtonsDeleteContent(!showButtonsDeleteContent)
            }
          >
            <AiFillDelete />
          </button>
        </div>

        {arrayDetailsPage.map((item, index) => (
          <div key={index}>
            {item.typeValue === "T" && (
              <h2>
                {item.value}
                {showButtonsDeleteContent && (
                  <button
                    className="btnDeleteContent"
                    onClick={() => deleteInfo(item.id)}
                  >
                    <FiDelete />
                  </button>
                )}
              </h2>
            )}

            {item.typeValue === "P" && (
              <p>
                {item.value}
                {showButtonsDeleteContent && (
                  <button
                    className="btnDeleteContent"
                    onClick={() => deleteInfo(item.id)}
                  >
                    <FiDelete />
                  </button>
                )}
              </p>
            )}

            <ul>
              {item.typeValue === "L" && (
                <li>
                  {item.value}
                  {showButtonsDeleteContent && (
                    <button
                      className="btnDeleteContent"
                      onClick={() => deleteInfo(item.id)}
                    >
                      <FiDelete />
                    </button>
                  )}
                </li>
              )}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
