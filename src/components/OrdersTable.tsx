import Icon from './Icon'

const orders = [
  { id: '#ORD-3982', customer: 'Olivia Martin', date: 'Sep 16, 2024', amount: '$342.00', status: 'Completed', initials: 'OM', color: 'blue' },
  { id: '#ORD-3981', customer: 'Ethan Walker', date: 'Sep 16, 2024', amount: '$128.50', status: 'Processing', initials: 'EW', color: 'orange' },
  { id: '#ORD-3980', customer: 'Sophia Davis', date: 'Sep 15, 2024', amount: '$564.20', status: 'Completed', initials: 'SD', color: 'purple' },
  { id: '#ORD-3979', customer: 'James Wilson', date: 'Sep 15, 2024', amount: '$89.00', status: 'Refunded', initials: 'JW', color: 'green' },
]

function OrdersTable() {
  return (
    <section className="panel orders-panel">
      <div className="panel-heading">
        <div>
          <p className="section-kicker">Commerce</p>
          <h3>Last orders</h3>
        </div>
        <button className="text-button" type="button">View all <span aria-hidden="true">-&gt;</span></button>
      </div>
      <div className="orders-table-wrap">
        <table className="orders-table">
          <thead><tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Amount</th><th>Status</th><th aria-label="Actions" /></tr></thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="muted-cell">{order.id}</td>
                <td><div className="customer-cell"><span className={`customer-avatar ${order.color}`}>{order.initials}</span>{order.customer}</div></td>
                <td className="muted-cell">{order.date}</td>
                <td className="amount-cell">{order.amount}</td>
                <td><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></td>
                <td><button className="icon-button small" type="button" aria-label={`More options for ${order.id}`}><Icon name="more" size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default OrdersTable
