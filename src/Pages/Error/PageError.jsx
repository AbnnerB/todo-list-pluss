import { Link } from "react-router-dom";

import "./errorStyle.css";

export default function PageError() {
  return (
    <div className="PageError">
      <h1>Pagina não Encontrada!!!</h1>
      <Link to="/">Retorne a pagina Inicial</Link>
    </div>
  );
}
