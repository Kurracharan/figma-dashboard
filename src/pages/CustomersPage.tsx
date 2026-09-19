import { useEffect, useRef, useState } from 'react'
import DateSelector from '../components/DateSelector'
import Icon from '../components/Icon'
import { downloadCsv } from '../utils/downloadCsv'

const customerMonthOptions = [
  { value: 'sep-2024', label: 'Sep 2024' },
  { value: 'aug-2024', label: 'Aug 2024' },
  { value: 'jul-2024', label: 'Jul 2024' },
  { value: 'jun-2024', label: 'Jun 2024' },
]

const customerStatsByPeriod: Record<string, Array<{ label: string; value: string; change: string; direction: 'up' | 'down'; icon: 'users' | 'chart' | 'arrow-down' | 'wallet'; tone: 'blue' | 'purple' | 'orange' | 'green' }>> = {
  'sep-2024': [
    { label: 'Active customers', value: '24,812', change: '8.6%', direction: 'up', icon: 'users', tone: 'blue' },
    { label: 'New this month', value: '1,284', change: '4.2%', direction: 'up', icon: 'chart', tone: 'purple' },
    { label: 'Churn rate', value: '2.1%', change: '0.7%', direction: 'down', icon: 'arrow-down', tone: 'orange' },
    { label: 'Lifetime value', value: '$14.2k', change: '6.8%', direction: 'up', icon: 'wallet', tone: 'green' },
  ],
  'aug-2024': [
    { label: 'Active customers', value: '23,948', change: '7.3%', direction: 'up', icon: 'users', tone: 'blue' },
    { label: 'New this month', value: '1,146', change: '3.7%', direction: 'up', icon: 'chart', tone: 'purple' },
    { label: 'Churn rate', value: '2.4%', change: '0.9%', direction: 'down', icon: 'arrow-down', tone: 'orange' },
    { label: 'Lifetime value', value: '$13.6k', change: '6.1%', direction: 'up', icon: 'wallet', tone: 'green' },
  ],
  'jul-2024': [
    { label: 'Active customers', value: '22,806', change: '6.1%', direction: 'up', icon: 'users', tone: 'blue' },
    { label: 'New this month', value: '1,064', change: '2.8%', direction: 'up', icon: 'chart', tone: 'purple' },
    { label: 'Churn rate', value: '2.7%', change: '1.1%', direction: 'down', icon: 'arrow-down', tone: 'orange' },
    { label: 'Lifetime value', value: '$12.9k', change: '5.2%', direction: 'up', icon: 'wallet', tone: 'green' },
  ],
  'jun-2024': [
    { label: 'Active customers', value: '21,542', change: '5.0%', direction: 'up', icon: 'users', tone: 'blue' },
    { label: 'New this month', value: '962', change: '2.3%', direction: 'up', icon: 'chart', tone: 'purple' },
    { label: 'Churn rate', value: '3.1%', change: '1.4%', direction: 'down', icon: 'arrow-down', tone: 'orange' },
    { label: 'Lifetime value', value: '$12.4k', change: '4.8%', direction: 'up', icon: 'wallet', tone: 'green' },
  ],
}

const initialCustomerRows = [
  { name: 'Olivia Martin', segment: 'VIP', orders: 58, spend: '$12,480', status: 'Active', initials: 'OM', color: 'blue' },
  { name: 'Ethan Walker', segment: 'Loyal', orders: 41, spend: '$8,360', status: 'Active', initials: 'EW', color: 'orange' },
  { name: 'Sophia Davis', segment: 'New', orders: 12, spend: '$1,940', status: 'Onboarding', initials: 'SD', color: 'purple' },
  { name: 'James Wilson', segment: 'Churn risk', orders: 6, spend: '$680', status: 'Paused', initials: 'JW', color: 'green' },
]

const recentActivity = [
  { title: 'Product review left', detail: 'Olivia Martin · Premium headset', time: '2h ago' },
  { title: 'Subscription renewed', detail: 'Ethan Walker · Pro plan', time: '5h ago' },
  { title: 'New discount used', detail: 'Sophia Davis · Welcome offer', time: '1d ago' },
]

type CustomerFormState = {
  fullName: string
  email: string
  phone: string
}

const emptyCustomerForm = { fullName: '', email: '', phone: '' }

function CustomersPage() {
  const [customerRows, setCustomerRows] = useState(initialCustomerRows)
  const [selectedPeriod, setSelectedPeriod] = useState('sep-2024')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState<CustomerFormState>(emptyCustomerForm)
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof CustomerFormState, string>>>({})
  const nameInputRef = useRef<HTMLInputElement | null>(null)
  const activeStats = customerStatsByPeriod[selectedPeriod] ?? customerStatsByPeriod['sep-2024']

  useEffect(() => {
    if (isModalOpen) {
      nameInputRef.current?.focus()
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsModalOpen(false)
        }
      }
      window.addEventListener('keydown', handleEscape)
      return () => window.removeEventListener('keydown', handleEscape)
    }
    return undefined
  }, [isModalOpen])

  const handleFieldChange = (field: keyof CustomerFormState, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }))
    setFormErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleAddCustomer = () => {
    const nextErrors: Partial<Record<keyof CustomerFormState, string>> = {}

    if (!formData.fullName.trim()) {
      nextErrors.fullName = 'Customer name is required.'
    }
    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!formData.phone.trim()) {
      nextErrors.phone = 'Phone number is required.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors)
      return
    }

    const initials = formData.fullName
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('') || 'CU'

    const name = formData.fullName.trim()
    const nextCustomer = {
      name,
      segment: 'New',
      orders: 1,
      spend: '$0.00',
      status: 'Onboarding',
      initials,
      color: 'purple',
    }

    setCustomerRows((current) => [nextCustomer, ...current])
    setFormData(emptyCustomerForm)
    setFormErrors({})
    setIsModalOpen(false)
    downloadCsv('customers.csv', ['Name', 'Email', 'Phone'], [{ Name: name, Email: formData.email.trim(), Phone: formData.phone.trim() }])
  }

  const handleModalClose = () => {
    setFormData(emptyCustomerForm)
    setFormErrors({})
    setIsModalOpen(false)
  }

  return (
    <section className="page-shell" aria-labelledby="customers-title">
      <div className="page-header">
        <div>
          <p className="section-kicker">CRM</p>
          <h2 id="customers-title">Customers</h2>
          <p className="page-subtitle">Monitor customer health, lifetime value, and engagement trends.</p>
        </div>
        <div className="dashboard-actions">
          <DateSelector options={customerMonthOptions} value={selectedPeriod} onChange={setSelectedPeriod} />
          <button className="download-button" type="button" onClick={() => setIsModalOpen(true)}>
            <Icon name="users" size={16} /> Add customer
          </button>
        </div>
      </div>

      <div className="stats-grid">
        {activeStats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <div className={`stat-icon stat-icon-${stat.tone}`}>
              <Icon name={stat.icon} size={20} />
            </div>
            <p className="stat-label">{stat.label}</p>
            <strong className="stat-value">{stat.value}</strong>
            <p className={`stat-change ${stat.direction}`}>
              <Icon name={stat.direction === 'up' ? 'arrow-up' : 'arrow-down'} size={14} />
              {stat.change} <span>vs last month</span>
            </p>
          </article>
        ))}
      </div>

      <div className="content-grid two-col">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Segments</p>
              <h3>Customer distribution</h3>
            </div>
          </div>
          <div className="segments-wrap">
            <div className="donut donut-small" aria-label="Customer segment distribution chart">
              <span>VIP<br /><strong>34%</strong></span>
            </div>
            <div className="segment-list">
              <div><span className="legend-dot blue" />VIP <strong>34%</strong></div>
              <div><span className="legend-dot purple" />Loyal <strong>28%</strong></div>
              <div><span className="legend-dot orange" />New <strong>24%</strong></div>
              <div><span className="legend-dot green" />Dormant <strong>14%</strong></div>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Activity</p>
              <h3>Recent activity</h3>
            </div>
            <button className="text-button" type="button">View all</button>
          </div>
          <div className="activity-list">
            {recentActivity.map((item) => (
              <div key={item.title} className="activity-row">
                <span className="activity-bullet" />
                <div className="activity-copy">
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                </div>
                <small>{item.time}</small>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="panel customer-table-panel">
        <div className="panel-heading">
          <div>
            <p className="section-kicker">Customers</p>
            <h3>Customer list</h3>
          </div>
          <button className="text-button" type="button">Export</button>
        </div>

        <div className="orders-table-wrap">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Segment</th>
                <th>Orders</th>
                <th>Lifetime spend</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {customerRows.map((customer) => (
                <tr key={`${customer.name}-${customer.orders}`}>
                  <td>
                    <div className="customer-cell">
                      <span className={`customer-avatar ${customer.color}`}>{customer.initials}</span>
                      {customer.name}
                    </div>
                  </td>
                  <td>{customer.segment}</td>
                  <td>{customer.orders}</td>
                  <td className="amount-cell">{customer.spend}</td>
                  <td><span className={`status ${customer.status === 'Active' ? 'completed' : customer.status === 'Onboarding' ? 'processing' : 'refunded'}`}>{customer.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={handleModalClose}>
          <div
            className="customer-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="customer-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="customer-modal-header">
              <div>
                <p className="section-kicker">Customer</p>
                <h3 id="customer-modal-title">Add customer</h3>
              </div>
              <button type="button" className="icon-button small" aria-label="Close customer modal" onClick={handleModalClose}>
                <Icon name="more" size={16} />
              </button>
            </div>

            <div className="customer-form">
              <div className="form-field">
                <label htmlFor="customer-name">Customer name</label>
                <input
                  id="customer-name"
                  ref={nameInputRef}
                  type="text"
                  value={formData.fullName}
                  onChange={(event) => handleFieldChange('fullName', event.target.value)}
                  placeholder="Jane Smith"
                  aria-invalid={Boolean(formErrors.fullName)}
                />
                {formErrors.fullName && <span className="field-error">{formErrors.fullName}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="customer-email">Email</label>
                <input
                  id="customer-email"
                  type="email"
                  value={formData.email}
                  onChange={(event) => handleFieldChange('email', event.target.value)}
                  placeholder="jane@example.com"
                  aria-invalid={Boolean(formErrors.email)}
                />
                {formErrors.email && <span className="field-error">{formErrors.email}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="customer-phone">Phone</label>
                <input
                  id="customer-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(event) => handleFieldChange('phone', event.target.value)}
                  placeholder="(555) 123-4567"
                  aria-invalid={Boolean(formErrors.phone)}
                />
                {formErrors.phone && <span className="field-error">{formErrors.phone}</span>}
              </div>
            </div>

            <div className="customer-modal-actions">
              <button type="button" className="secondary-action" onClick={handleModalClose}>Cancel</button>
              <button type="button" className="download-button" onClick={handleAddCustomer}>Add Customer</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default CustomersPage
