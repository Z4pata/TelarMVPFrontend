import iconUrl from '../../assets/telar-icono.jpeg'
import './Logo.css'

export function Logo() {
  return (
    <div className="logo">
      <img className="logo__icon" src={iconUrl} alt="" />
      <span className="logo__wordmark">TELAR</span>
    </div>
  )
}
