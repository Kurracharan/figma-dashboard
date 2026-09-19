import { useState } from 'react'
import DateSelector from '../components/DateSelector'
import Icon from '../components/Icon'
import StatCard from '../components/StatCard'
import { downloadCsv } from '../utils/downloadCsv'

const periodOptions = [
  { value: 'current', label: 'Last 30 days' },
  { value: 'aug-2024', label: 'Aug 2024' },
  { value: 'jul-2024', label: 'Jul 2024' },
  { value: 'jun-2024', label: 'Jun 2024' },
]

const analyticsDataByPeriod: Record<string, Array<{ label: string; value: string; change: string; direction: 'up' | 'down'; icon: 'wallet' | 'chart' | 'users' | 'credit-card'; tone: 'blue' | 'purple' | 'orange' | 'green' }>> = {
  current: [
    { label: 'Net revenue', value: '$84,248.60', change: '12.8%', direction: 'up', icon: 'wallet', tone: 'blue' },
    { label: 'Conversion rate', value: '6.42%', change: '1.3%', direction: 'up', icon: 'chart', tone: 'purple' },
    { label: 'Returning shoppers', value: '48.9%', change: '3.1%', direction: 'up', icon: 'users', tone: 'orange' },
    { label: 'Avg. order value', value: '$128.40', change: '2.4%', direction: 'down', icon: 'credit-card', tone: 'green' },
  ],
  'aug-2024': [
    { label: 'Net revenue', value: '$76,140.40', change: '10.5%', direction: 'up', icon: 'wallet', tone: 'blue' },
    { label: 'Conversion rate', value: '5.93%', change: '0.9%', direction: 'up', icon: 'chart', tone: 'purple' },
    { label: 'Returning shoppers', value: '46.7%', change: '2.6%', direction: 'up', icon: 'users', tone: 'orange' },
    { label: 'Avg. order value', value: '$121.90', change: '1.7%', direction: 'down', icon: 'credit-card', tone: 'green' },
  ],
  'jul-2024': [
    { label: 'Net revenue', value: '$71,830.20', change: '8.9%', direction: 'up', icon: 'wallet', tone: 'blue' },
    { label: 'Conversion rate', value: '5.61%', change: '0.6%', direction: 'up', icon: 'chart', tone: 'purple' },
    { label: 'Returning shoppers', value: '45.1%', change: '1.9%', direction: 'up', icon: 'users', tone: 'orange' },
    { label: 'Avg. order value', value: '$118.20', change: '2.1%', direction: 'down', icon: 'credit-card', tone: 'green' },
  ],
  'jun-2024': [
    { label: 'Net revenue', value: '$68,920.40', change: '7.7%', direction: 'up', icon: 'wallet', tone: 'blue' },
    { label: 'Conversion rate', value: '5.42%', change: '0.5%', direction: 'up', icon: 'chart', tone: 'purple' },
    { label: 'Returning shoppers', value: '43.8%', change: '1.4%', direction: 'up', icon: 'users', tone: 'orange' },
    { label: 'Avg. order value', value: '$114.70', change: '2.9%', direction: 'down', icon: 'credit-card', tone: 'green' },
  ],
}

const trafficSources = [
  { name: 'Organic search', value: '46%', percent: 46, color: 'blue' },
  { name: 'Paid ads', value: '28%', percent: 28, color: 'purple' },
  { name: 'Referral', value: '17%', percent: 17, color: 'orange' },
  { name: 'Direct traffic', value: '9%', percent: 9, color: 'green' },
]

const campaignRows = [
  { name: 'Summer launch', spend: '$4,200', lift: '+18.4%', status: 'strong' },
  { name: 'Email retargeting', spend: '$2,940', lift: '+12.1%', status: 'steady' },
  { name: 'Social ads', spend: '$6,180', lift: '+9.7%', status: 'strong' },
  { name: 'Affiliate push', spend: '$1,760', lift: '-2.3%', status: 'low' },
]

const conversionFunnel = [
  { label: 'Visitors', value: '24,892', width: '100%' },
  { label: 'Product views', value: '15,620', width: '63%' },
  { label: 'Add to cart', value: '8,440', width: '34%' },
  { label: 'Checkout', value: '3,122', width: '13%' },
  { label: 'Purchase', value: '1,474', width: '6%' },
]

function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('current')
  const analyticsStats = analyticsDataByPeriod[selectedPeriod] ?? analyticsDataByPeriod.current

  const handleExport = () => {
    downloadCsv(
      'analytics-report.csv',
      ['Metric', 'Value', 'Change'],
      analyticsStats.map((stat) => ({ Metric: stat.label, Value: stat.value, Change: stat.change })),
    )
  }

  return (
    <section className="page-shell" aria-labelledby="analytics-title">
      <div className="page-header">
        <div>
          <p className="section-kicker">Performance</p>
          <h2 id="analytics-title">Analytics</h2>
          <p className="page-subtitle">Track revenue, customer engagement, and acquisition performance.</p>
        </div>
        <div className="dashboard-actions">
          <DateSelector options={periodOptions} value={selectedPeriod} onChange={setSelectedPeriod} />
          <button className="download-button" type="button" onClick={handleExport}>
            <Icon name="download" size={16} /> Export
          </button>
        </div>
      </div>

      <div className="stats-grid">
        {analyticsStats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            direction={stat.direction}
            icon={stat.icon}
            tone={stat.tone}
          />
        ))}
      </div>

      <div className="analytics-grid">
        <section className="panel analytics-panel">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Overview</p>
              <h3>Revenue trend</h3>
            </div>
            <button className="icon-button" type="button" aria-label="More options">
              <Icon name="more" />
            </button>
          </div>
          <div className="chart-summary">
            <strong>$84,248.60</strong>
            <span className="positive">+12.8%</span>
          </div>
          <div className="analytics-visual" aria-label="Revenue metrics trend chart">
            <svg viewBox="0 0 560 220" preserveAspectRatio="none" role="img">
              <defs>
                <linearGradient id="analytics-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#4d7cff" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#4d7cff" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[30, 70, 110, 150, 190].map((y) => (
                <line key={y} x1="0" x2="560" y1={y} y2={y} stroke="#edf0f4" strokeWidth="1" />
              ))}
              <path
                d="M0 170 C40 140, 80 120, 125 135 S200 120, 240 98 S325 72, 370 92 S435 48, 490 66 S540 18, 560 26 L560 220 L0 220 Z"
                fill="url(#analytics-fill)"
              />
              <path
                d="M0 170 C40 140, 80 120, 125 135 S200 120, 240 98 S325 72, 370 92 S435 48, 490 66 S540 18, 560 26"
                fill="none"
                stroke="#4d7cff"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="490" cy="66" r="5" fill="#fff" stroke="#4d7cff" strokeWidth="3" />
            </svg>
          </div>
          <div className="chart-months chart-months-tight">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
          </div>
        </section>

        <section className="panel traffic-panel">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Sources</p>
              <h3>Traffic sources</h3>
            </div>
            <button className="icon-button" type="button" aria-label="More options">
              <Icon name="more" />
            </button>
          </div>
          <div className="traffic-stack">
            {trafficSources.map((source) => (
              <div key={source.name} className="traffic-row">
                <div className="traffic-label">
                  <span className={`legend-dot ${source.color}`} />
                  <span>{source.name}</span>
                </div>
                <strong>{source.value}</strong>
                <div className="traffic-meter">
                  <span style={{ width: `${source.percent}%`, background: source.color === 'blue' ? '#4778f5' : source.color === 'purple' ? '#976aea' : source.color === 'orange' ? '#f4a158' : '#39ae83' }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="content-grid two-col">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Funnel</p>
              <h3>Conversion funnel</h3>
            </div>
          </div>
          <div className="funnel-list">
            {conversionFunnel.map((step) => (
              <div key={step.label} className="funnel-step">
                <div className="funnel-meta">
                  <span>{step.label}</span>
                  <strong>{step.value}</strong>
                </div>
                <div className="funnel-bar">
                  <span style={{ width: step.width }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Campaigns</p>
              <h3>Top campaigns</h3>
            </div>
            <button className="text-button" type="button">View all</button>
          </div>
          <div className="campaign-list">
            {campaignRows.map((row) => (
              <div key={row.name} className="campaign-row">
                <div>
                  <strong>{row.name}</strong>
                  <span>Spend {row.spend}</span>
                </div>
                <span className={`campaign-lift ${row.status}`}>{row.lift}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}

export default AnalyticsPage
