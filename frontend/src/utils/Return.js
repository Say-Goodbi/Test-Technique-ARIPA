import { useNavigate } from 'react-router-dom';

export default function LastPageButton() {
  const navigate = useNavigate();

  const goToLastPage = () => {
    navigate(-1);
  };

  return <button onClick={goToLastPage}>Retour</button>;
}
