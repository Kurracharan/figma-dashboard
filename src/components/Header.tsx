import Icon from './Icon'

function Header() {
  return (
    <header className="header">
      <div className="header-search"><Icon name="search" size={19} /><input aria-label="Search dashboard" placeholder="Search anything..." /></div>
      <div className="header-actions"><button className="header-icon-button" type="button" aria-label="View notifications"><Icon name="bell" size={19} /><span className="notification-dot" /></button><span className="header-divider" /><button className="profile-button" type="button" aria-label="Open profile menu">AM</button><span className="profile-name">Alex Morgan</span></div>
    </header>
  )
}

export default Header
