import { NavLink } from 'react-router-dom'
import Icon from './Icon'

const navigationItems = [
  { label: 'Dashboard', to: '/', icon: 'grid' as const },
  { label: 'Analytics', to: '/analytics', icon: 'chart' as const },
  { label: 'Orders', to: '/orders', icon: 'orders' as const },
  { label: 'Products', to: '/products', icon: 'bag' as const },
  { label: 'Customers', to: '/customers', icon: 'users' as const },
]

const utilityItems = [
  { label: 'Help center', to: '/help-center', icon: 'help' as const },
  { label: 'Settings', to: '/settings', icon: 'settings' as const },
]

function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="brand"><span className="brand-mark">F</span><span>figma<span className="brand-accent">.</span></span></div>
      <p className="sidebar-label">Main menu</p>
      <nav className="primary-nav">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <Icon name={item.icon} size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <p className="sidebar-label sidebar-label-bottom">Settings</p>
      <nav className="secondary-nav">
        {utilityItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <Icon name={item.icon} size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-user"><span className="customer-avatar blue">AM</span><span><strong>Alex Morgan</strong><small>Admin account</small></span><Icon name="more" size={16} /></div>
    </aside>
  )
}

export default Sidebar
