import Icon from '../components/Icon'

const settingsSections = [
  { title: 'Store profile', detail: 'Basic store info, branding, and public details', badge: 'Updated', tone: 'blue' },
  { title: 'Notifications', detail: 'Email, push, and task reminders for your team', badge: '3 active', tone: 'purple' },
  { title: 'Security', detail: 'Two-factor authentication and access controls', badge: 'Secure', tone: 'green' },
  { title: 'Billing', detail: 'Plan details, invoices, and payment preferences', badge: 'Review', tone: 'orange' },
]

const accountDetails = [
  { label: 'Business name', value: 'Figma Studio Inc.' },
  { label: 'Owner', value: 'Alex Morgan' },
  { label: 'Timezone', value: 'UTC-05:00' },
  { label: 'Default currency', value: 'USD' },
]

function SettingsPage() {
  return (
    <section className="page-shell" aria-labelledby="settings-title">
      <div className="page-header">
        <div>
          <p className="section-kicker">Preferences</p>
          <h2 id="settings-title">Settings</h2>
          <p className="page-subtitle">Manage your account, store preferences, and workspace controls.</p>
        </div>
        <div className="dashboard-actions">
          <button className="date-button" type="button">
            <Icon name="calendar" size={16} /> Workspace
          </button>
          <button className="download-button" type="button">
            <Icon name="settings" size={16} /> Save changes
          </button>
        </div>
      </div>

      <div className="settings-grid">
        {settingsSections.map((section) => (
          <article key={section.title} className="settings-card">
            <div className={`settings-icon ${section.tone}`}>
              <Icon name={section.tone === 'blue' ? 'grid' : section.tone === 'purple' ? 'bell' : section.tone === 'green' ? 'users' : 'wallet'} size={20} />
            </div>
            <div className="settings-copy">
              <div className="settings-head">
                <h3>{section.title}</h3>
                <span className="mini-badge">{section.badge}</span>
              </div>
              <p>{section.detail}</p>
            </div>
          </article>
        ))}
      </div>

      <section className="panel settings-panel">
        <div className="panel-heading">
          <div>
            <p className="section-kicker">Account</p>
            <h3>Workspace details</h3>
          </div>
          <button className="text-button" type="button">Edit</button>
        </div>

        <div className="account-list">
          {accountDetails.map((item) => (
            <div key={item.label} className="account-row">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}

export default SettingsPage
