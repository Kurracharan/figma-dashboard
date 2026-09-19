import { useState } from 'react'
import DateSelector from '../components/DateSelector'
import Icon from '../components/Icon'
import ChartPanel from '../components/ChartPanel'
import OrdersTable from '../components/OrdersTable'
import StatCard from '../components/StatCard'
import TransactionsList from '../components/TransactionsList'
import { downloadCsv } from '../utils/downloadCsv'

const dashboardPeriodOptions = [
  { value: 'current', label: 'Sep 10 - Sep 16, 2024' },
  { value: 'aug-2024', label: 'Aug 11 - Aug 17, 2024' },
  { value: 'jul-2024', label: 'Jul 12 - Jul 18, 2024' },
  { value: 'jun-2024', label: 'Jun 13 - Jun 19, 2024' },
]

const dashboardDataByPeriod: Record<string, { rows: Array<{ Metric: string; Value: string; Change: string }>; stats: Array<{ label: string; value: string; change: string; direction: 'up' | 'down'; icon: 'wallet' | 'orders' | 'users' | 'credit-card'; tone: 'blue' | 'purple' | 'orange' | 'green' }> }> = {
  current: {
    rows: [
      { Metric: 'Total revenue', Value: '$84,248.60', Change: '12.8%' },
      { Metric: 'Total orders', Value: '2,456', Change: '8.2%' },
      { Metric: 'New customers', Value: '1,284', Change: '4.6%' },
      { Metric: 'Average order value', Value: '$128.40', Change: '2.4%' },
    ],
    stats: [
      { label: 'Total revenue', value: '$84,248.60', change: '12.8%', direction: 'up', icon: 'wallet', tone: 'blue' },
      { label: 'Total orders', value: '2,456', change: '8.2%', direction: 'up', icon: 'orders', tone: 'purple' },
      { label: 'New customers', value: '1,284', change: '4.6%', direction: 'up', icon: 'users', tone: 'orange' },
      { label: 'Average order value', value: '$128.40', change: '2.4%', direction: 'down', icon: 'credit-card', tone: 'green' },
    ],
  },
  'aug-2024': {
    rows: [
      { Metric: 'Total revenue', Value: '$76,140.40', Change: '10.5%' },
      { Metric: 'Total orders', Value: '2,312', Change: '6.4%' },
      { Metric: 'New customers', Value: '1,146', Change: '3.7%' },
      { Metric: 'Average order value', Value: '$121.90', Change: '1.7%' },
    ],
    stats: [
      { label: 'Total revenue', value: '$76,140.40', change: '10.5%', direction: 'up', icon: 'wallet', tone: 'blue' },
      { label: 'Total orders', value: '2,312', change: '6.4%', direction: 'up', icon: 'orders', tone: 'purple' },
      { label: 'New customers', value: '1,146', change: '3.7%', direction: 'up', icon: 'users', tone: 'orange' },
      { label: 'Average order value', value: '$121.90', change: '1.7%', direction: 'down', icon: 'credit-card', tone: 'green' },
    ],
  },
  'jul-2024': {
    rows: [
      { Metric: 'Total revenue', Value: '$71,830.20', Change: '8.9%' },
      { Metric: 'Total orders', Value: '2,168', Change: '5.1%' },
      { Metric: 'New customers', Value: '1,064', Change: '2.8%' },
      { Metric: 'Average order value', Value: '$118.20', Change: '1.8%' },
    ],
    stats: [
      { label: 'Total revenue', value: '$71,830.20', change: '8.9%', direction: 'up', icon: 'wallet', tone: 'blue' },
      { label: 'Total orders', value: '2,168', change: '5.1%', direction: 'up', icon: 'orders', tone: 'purple' },
      { label: 'New customers', value: '1,064', change: '2.8%', direction: 'up', icon: 'users', tone: 'orange' },
      { label: 'Average order value', value: '$118.20', change: '1.8%', direction: 'down', icon: 'credit-card', tone: 'green' },
    ],
  },
  'jun-2024': {
    rows: [
      { Metric: 'Total revenue', Value: '$68,920.40', Change: '7.7%' },
      { Metric: 'Total orders', Value: '2,034', Change: '4.2%' },
      { Metric: 'New customers', Value: '962', Change: '2.3%' },
      { Metric: 'Average order value', Value: '$114.70', Change: '1.1%' },
    ],
    stats: [
      { label: 'Total revenue', value: '$68,920.40', change: '7.7%', direction: 'up', icon: 'wallet', tone: 'blue' },
      { label: 'Total orders', value: '2,034', change: '4.2%', direction: 'up', icon: 'orders', tone: 'purple' },
      { label: 'New customers', value: '962', change: '2.3%', direction: 'up', icon: 'users', tone: 'orange' },
      { label: 'Average order value', value: '$114.70', change: '1.1%', direction: 'down', icon: 'credit-card', tone: 'green' },
    ],
  },
}

function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('current')
  const selectedData = dashboardDataByPeriod[selectedPeriod] ?? dashboardDataByPeriod.current

  const handleExport = () => {
    downloadCsv('dashboard-report.csv', ['Metric', 'Value', 'Change'], selectedData.rows)
  }

  return (
    <section className="dashboard-page" aria-labelledby="dashboard-title">
      <div className="dashboard-heading">
        <div><p className="section-kicker">Monday, September 16, 2024</p><h2 id="dashboard-title">Good morning, Alex</h2><p className="page-subtitle">Here&apos;s what&apos;s happening with your store today.</p></div>
        <div className="dashboard-actions"><DateSelector options={dashboardPeriodOptions} value={selectedPeriod} onChange={setSelectedPeriod} /><button className="download-button" type="button" onClick={handleExport}><Icon name="download" size={16} /> Export</button></div>
      </div>
      <div className="stats-grid">
        {selectedData.stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} change={stat.change} direction={stat.direction} icon={stat.icon} tone={stat.tone} />
        ))}
      </div>
      <div className="analytics-grid"><ChartPanel type="revenue" /><ChartPanel type="channels" /></div>
      <div className="performance-grid"><section className="panel performance-panel"><div className="panel-heading"><div><p className="section-kicker">Performance</p><h3>Sales overview</h3></div><button className="icon-button" type="button" aria-label="More options"><Icon name="more" /></button></div><div className="sales-bars"><div className="bar-group"><span className="bar-value">$12.4k</span><div className="bar blue-bar" style={{ height: '88%' }} /><span>Mon</span></div><div className="bar-group"><span className="bar-value">$9.8k</span><div className="bar blue-bar" style={{ height: '68%' }} /><span>Tue</span></div><div className="bar-group"><span className="bar-value">$15.2k</span><div className="bar blue-bar" style={{ height: '100%' }} /><span>Wed</span></div><div className="bar-group"><span className="bar-value">$11.6k</span><div className="bar blue-bar" style={{ height: '80%' }} /><span>Thu</span></div><div className="bar-group"><span className="bar-value">$13.8k</span><div className="bar blue-bar" style={{ height: '91%' }} /><span>Fri</span></div><div className="bar-group"><span className="bar-value">$8.6k</span><div className="bar blue-bar" style={{ height: '58%' }} /><span>Sat</span></div><div className="bar-group"><span className="bar-value">$12.8k</span><div className="bar blue-bar" style={{ height: '84%' }} /><span>Sun</span></div></div></section><TransactionsList /></div>
      <OrdersTable />
    </section>
  )
}

export default DashboardPage
