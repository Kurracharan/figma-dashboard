import { useState } from 'react'
import { Link } from 'react-router-dom'
import DateSelector from '../components/DateSelector'
import Icon from '../components/Icon'
import { downloadCsv } from '../utils/downloadCsv'

const orderOptions = [
  { value: 'sep-2024', label: 'Sep 2024' },
  { value: 'aug-2024', label: 'Aug 2024' },
  { value: 'jul-2024', label: 'Jul 2024' },
  { value: 'jun-2024', label: 'Jun 2024' },
]

const orderDataByPeriod: Record<string, { stats: Array<{ label: string; value: string; change: string; direction: 'up' | 'down'; icon: 'orders' | 'wallet' | 'calendar' | 'credit-card'; tone: 'blue' | 'purple' | 'orange' | 'green' }>; rows: Array<{ id: string; customer: string; product: string; date: string; amount: string; status: string; initials: string; color: 'blue' | 'orange' | 'purple' | 'green' }> }> = {
  'sep-2024': {
    stats: [
      { label: 'Total orders', value: '2,456', change: '8.2%', direction: 'up', icon: 'orders', tone: 'blue' },
      { label: 'Revenue', value: '$84,248.60', change: '12.8%', direction: 'up', icon: 'wallet', tone: 'purple' },
      { label: 'Pending', value: '184', change: '2.4%', direction: 'down', icon: 'calendar', tone: 'orange' },
      { label: 'Avg. order value', value: '$128.40', change: '3.6%', direction: 'up', icon: 'credit-card', tone: 'green' },
    ],
    rows: [
      { id: '#ORD-3982', customer: 'Olivia Martin', product: 'Aero Pro Headset', date: 'Sep 16, 2024', amount: '$342.00', status: 'Completed', initials: 'OM', color: 'blue' },
      { id: '#ORD-3981', customer: 'Ethan Walker', product: 'Luma Smartwatch', date: 'Sep 16, 2024', amount: '$128.50', status: 'Processing', initials: 'EW', color: 'orange' },
      { id: '#ORD-3980', customer: 'Sophia Davis', product: 'Nova Backpack', date: 'Sep 15, 2024', amount: '$564.20', status: 'Completed', initials: 'SD', color: 'purple' },
      { id: '#ORD-3979', customer: 'James Wilson', product: 'Pulse Speaker', date: 'Sep 15, 2024', amount: '$89.00', status: 'Refunded', initials: 'JW', color: 'green' },
      { id: '#ORD-3978', customer: 'Ava Thompson', product: 'Aero Pro Headset', date: 'Sep 14, 2024', amount: '$299.00', status: 'Completed', initials: 'AT', color: 'blue' },
      { id: '#ORD-3977', customer: 'Lucas Brown', product: 'Nova Backpack', date: 'Sep 14, 2024', amount: '$174.80', status: 'Processing', initials: 'LB', color: 'orange' },
    ],
  },
  'aug-2024': {
    stats: [
      { label: 'Total orders', value: '2,312', change: '6.4%', direction: 'up', icon: 'orders', tone: 'blue' },
      { label: 'Revenue', value: '$76,140.40', change: '10.5%', direction: 'up', icon: 'wallet', tone: 'purple' },
      { label: 'Pending', value: '206', change: '1.8%', direction: 'down', icon: 'calendar', tone: 'orange' },
      { label: 'Avg. order value', value: '$121.90', change: '2.1%', direction: 'up', icon: 'credit-card', tone: 'green' },
    ],
    rows: [
      { id: '#ORD-3902', customer: 'Grace Hall', product: 'Aero Pro Headset', date: 'Aug 28, 2024', amount: '$318.00', status: 'Completed', initials: 'GH', color: 'blue' },
      { id: '#ORD-3901', customer: 'Daniel Lee', product: 'Luma Smartwatch', date: 'Aug 27, 2024', amount: '$196.40', status: 'Processing', initials: 'DL', color: 'orange' },
      { id: '#ORD-3898', customer: 'Emily Clark', product: 'Nova Backpack', date: 'Aug 25, 2024', amount: '$540.80', status: 'Completed', initials: 'EC', color: 'purple' },
      { id: '#ORD-3897', customer: 'Michael Green', product: 'Pulse Speaker', date: 'Aug 22, 2024', amount: '$96.20', status: 'Refunded', initials: 'MG', color: 'green' },
      { id: '#ORD-3896', customer: 'Mia Adams', product: 'Aero Pro Headset', date: 'Aug 21, 2024', amount: '$286.00', status: 'Completed', initials: 'MA', color: 'blue' },
      { id: '#ORD-3893', customer: 'Noah Perez', product: 'Nova Backpack', date: 'Aug 20, 2024', amount: '$170.40', status: 'Processing', initials: 'NP', color: 'orange' },
    ],
  },
  'jul-2024': {
    stats: [
      { label: 'Total orders', value: '2,168', change: '5.1%', direction: 'up', icon: 'orders', tone: 'blue' },
      { label: 'Revenue', value: '$71,830.20', change: '8.9%', direction: 'up', icon: 'wallet', tone: 'purple' },
      { label: 'Pending', value: '224', change: '2.5%', direction: 'down', icon: 'calendar', tone: 'orange' },
      { label: 'Avg. order value', value: '$118.20', change: '1.8%', direction: 'up', icon: 'credit-card', tone: 'green' },
    ],
    rows: [
      { id: '#ORD-3825', customer: 'Hannah Scott', product: 'Aero Pro Headset', date: 'Jul 24, 2024', amount: '$290.00', status: 'Completed', initials: 'HS', color: 'blue' },
      { id: '#ORD-3824', customer: 'Henry Ward', product: 'Luma Smartwatch', date: 'Jul 23, 2024', amount: '$188.10', status: 'Processing', initials: 'HW', color: 'orange' },
      { id: '#ORD-3821', customer: 'Ella Flores', product: 'Nova Backpack', date: 'Jul 20, 2024', amount: '$505.60', status: 'Completed', initials: 'EF', color: 'purple' },
      { id: '#ORD-3819', customer: 'Jacob Reed', product: 'Pulse Speaker', date: 'Jul 17, 2024', amount: '$92.80', status: 'Refunded', initials: 'JR', color: 'green' },
      { id: '#ORD-3816', customer: 'Amelia Ross', product: 'Aero Pro Headset', date: 'Jul 15, 2024', amount: '$269.00', status: 'Completed', initials: 'AR', color: 'blue' },
      { id: '#ORD-3812', customer: 'Leo Turner', product: 'Nova Backpack', date: 'Jul 11, 2024', amount: '$164.60', status: 'Processing', initials: 'LT', color: 'orange' },
    ],
  },
  'jun-2024': {
    stats: [
      { label: 'Total orders', value: '2,034', change: '4.2%', direction: 'up', icon: 'orders', tone: 'blue' },
      { label: 'Revenue', value: '$68,920.40', change: '7.7%', direction: 'up', icon: 'wallet', tone: 'purple' },
      { label: 'Pending', value: '238', change: '3.2%', direction: 'down', icon: 'calendar', tone: 'orange' },
      { label: 'Avg. order value', value: '$114.70', change: '1.1%', direction: 'up', icon: 'credit-card', tone: 'green' },
    ],
    rows: [
      { id: '#ORD-3748', customer: 'Sofia Lewis', product: 'Aero Pro Headset', date: 'Jun 27, 2024', amount: '$279.00', status: 'Completed', initials: 'SL', color: 'blue' },
      { id: '#ORD-3744', customer: 'Benjamin Brooks', product: 'Luma Smartwatch', date: 'Jun 26, 2024', amount: '$176.20', status: 'Processing', initials: 'BB', color: 'orange' },
      { id: '#ORD-3741', customer: 'Isabella Murphy', product: 'Nova Backpack', date: 'Jun 22, 2024', amount: '$484.10', status: 'Completed', initials: 'IM', color: 'purple' },
      { id: '#ORD-3738', customer: 'Logan Price', product: 'Pulse Speaker', date: 'Jun 18, 2024', amount: '$88.30', status: 'Refunded', initials: 'LP', color: 'green' },
      { id: '#ORD-3734', customer: 'Chloe James', product: 'Aero Pro Headset', date: 'Jun 14, 2024', amount: '$259.00', status: 'Completed', initials: 'CJ', color: 'blue' },
      { id: '#ORD-3730', customer: 'Nathan Hill', product: 'Nova Backpack', date: 'Jun 10, 2024', amount: '$158.10', status: 'Processing', initials: 'NH', color: 'orange' },
    ],
  },
}

function OrdersPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('sep-2024')
  const selectedData = orderDataByPeriod[selectedPeriod] ?? orderDataByPeriod['sep-2024']

  const handleExport = () => {
    downloadCsv('orders.csv', ['Order ID', 'Customer', 'Product', 'Date', 'Amount', 'Status'], selectedData.rows)
  }

  return (
    <section className="page-shell" aria-labelledby="orders-title">
      <div className="page-header">
        <div>
          <p className="section-kicker">Commerce</p>
          <h2 id="orders-title">Orders</h2>
          <p className="page-subtitle">Review order activity, fulfillment status, and revenue from recent transactions.</p>
        </div>
        <div className="dashboard-actions">
          <DateSelector options={orderOptions} value={selectedPeriod} onChange={setSelectedPeriod} />
          <button className="download-button" type="button" onClick={handleExport}>
            <Icon name="download" size={16} /> Export
          </button>
        </div>
      </div>

      <div className="order-toolbar">
        <div className="order-filters" aria-label="Order filters">
          <button type="button" className="filter-pill active">All orders</button>
          <button type="button" className="filter-pill">Completed</button>
          <button type="button" className="filter-pill">Processing</button>
          <button type="button" className="filter-pill">Refunded</button>
        </div>
        <div className="search-inline" aria-label="Search orders">
          <Icon name="search" size={15} />
          <input aria-label="Search orders" placeholder="Search order or customer" />
        </div>
      </div>

      <div className="stats-grid">
        {selectedData.stats.map((stat) => (
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

      <section className="panel orders-page-panel">
        <div className="panel-heading">
          <div>
            <p className="section-kicker">Recent activity</p>
            <h3>Order list</h3>
          </div>
          <Link to="/" className="text-button inline-link">Back to dashboard</Link>
        </div>

        <div className="orders-table-wrap">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {selectedData.rows.map((order) => (
                <tr key={order.id}>
                  <td className="muted-cell">{order.id}</td>
                  <td>
                    <div className="customer-cell">
                      <span className={`customer-avatar ${order.color}`}>{order.initials}</span>
                      {order.customer}
                    </div>
                  </td>
                  <td>{order.product}</td>
                  <td className="muted-cell">{order.date}</td>
                  <td className="amount-cell">{order.amount}</td>
                  <td>
                    <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
                  </td>
                  <td>
                    <button className="icon-button small" type="button" aria-label={`More actions for ${order.id}`}>
                      <Icon name="more" size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  )
}

export default OrdersPage
