import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Icon from './Icon'

function Sidebar() {
  const location = useLocation()
  const isEcommerceActive =
    ['/products', '/orders', '/customers'].includes(location.pathname)

  const [isEcommerceOpen, setIsEcommerceOpen] = useState(true)

  return (
    <aside className="sidebar" aria-label="Primary navigation">
      {/* Brand Header */}
      <div className="brand">
        <div className="brand-logo-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="7" r="4" fill="#34D399" />
            <circle cx="7" cy="14" r="4" fill="#60A5FA" />
            <circle cx="17" cy="14" r="4" fill="#F59E0B" />
            <circle cx="12" cy="17" r="3" fill="#EC4899" />
          </svg>
        </div>
        <span className="brand-name">FLOWER</span>
      </div>

      {/* Sidebar Search Bar */}
      <div className="sidebar-search">
        <Icon name="search" size={16} />
        <input type="text" placeholder="Search anything" aria-label="Sidebar search" />
      </div>

      <p className="sidebar-label">MAIN MENU</p>
      <nav className="primary-nav">
        {/* Dashboard */}
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          <Icon name="grid" size={18} />
          <span>Dashboard</span>
        </NavLink>

        {/* E-Commerce Group Accordion */}
        <div className={`nav-group ${isEcommerceActive ? 'group-active' : ''}`}>
          <button
            type="button"
            className={`nav-link group-header ${isEcommerceActive ? 'active-group-header' : ''}`}
            onClick={() => setIsEcommerceOpen((prev) => !prev)}
          >
            <div className="nav-link-left">
              <Icon name="bag" size={18} />
              <span>E-COMMERCE</span>
            </div>
            <Icon
              name={isEcommerceOpen ? 'chevron-down' : 'chevron-right'}
              size={14}
            />
          </button>

          {isEcommerceOpen && (
            <div className="sub-nav">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? 'sub-nav-link active' : 'sub-nav-link'
                }
              >
                <span className="sub-bullet">•</span>
                <span>Products</span>
              </NavLink>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive ? 'sub-nav-link active' : 'sub-nav-link'
                }
              >
                <span className="sub-bullet">•</span>
                <span>Orders</span>
              </NavLink>
              <NavLink
                to="/customers"
                className={({ isActive }) =>
                  isActive ? 'sub-nav-link active' : 'sub-nav-link'
                }
              >
                <span className="sub-bullet">•</span>
                <span>Customers</span>
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      <div className="sidebar-user">
        <span className="customer-avatar blue">AM</span>
        <span>
          <strong>Alex Morgan</strong>
          <small>Admin account</small>
        </span>
        <Icon name="more" size={16} />
      </div>
    </aside>
  )
}

export default Sidebar
