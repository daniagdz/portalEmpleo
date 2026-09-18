import './Spinner.css'

export function SpinnerLoad({ message = "Cargando empleos..." }) {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p className="spinner-text">{message}</p>
    </div>
  )
}
