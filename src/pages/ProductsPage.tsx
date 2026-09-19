import { useEffect, useRef, useState } from 'react'
import DateSelector from '../components/DateSelector'
import Icon from '../components/Icon'

const productPeriodOptions = [
  { value: 'current', label: 'This month' },
  { value: 'aug-2024', label: 'Aug 2024' },
  { value: 'jul-2024', label: 'Jul 2024' },
  { value: 'jun-2024', label: 'Jun 2024' },
]

const productsByPeriod: Record<string, { cards: Array<{ name: string; category: string; price: string; stock: string; trend: string; tone: 'blue' | 'purple' | 'orange' | 'green' }>; bestsellers: Array<{ name: string; sku: string; sales: string; revenue: string; status: string }>; metrics: Array<{ label: string; value: string; change: string; direction: 'up' | 'down'; icon: 'bag' | 'orders' | 'chart' | 'credit-card'; tone: 'blue' | 'purple' | 'orange' | 'green'; extra: string }>} > = {
  current: {
    cards: [
      { name: 'Aero Pro Headset', category: 'Audio', price: '$299.00', stock: '42 in stock', trend: '+14.2%', tone: 'blue' },
      { name: 'Luma Smartwatch', category: 'Wearables', price: '$199.00', stock: '18 in stock', trend: '+9.6%', tone: 'purple' },
      { name: 'Nova Backpack', category: 'Accessories', price: '$89.00', stock: '27 in stock', trend: '+6.1%', tone: 'orange' },
      { name: 'Pulse Speaker', category: 'Audio', price: '$149.00', stock: '15 in stock', trend: '+11.3%', tone: 'green' },
    ],
    bestsellers: [
      { name: 'Aero Pro Headset', sku: 'SKU-1842', sales: '1,248', revenue: '$298,752', status: 'Best seller' },
      { name: 'Luma Smartwatch', sku: 'SKU-2014', sales: '986', revenue: '$196,314', status: 'Trending' },
      { name: 'Nova Backpack', sku: 'SKU-0428', sales: '742', revenue: '$66,198', status: 'Popular' },
      { name: 'Pulse Speaker', sku: 'SKU-1109', sales: '628', revenue: '$93,572', status: 'Hot' },
    ],
    metrics: [
      { label: 'Total products', value: '1,248', change: '8.4%', direction: 'up', icon: 'bag', tone: 'blue', extra: 'vs last month' },
      { label: 'Low stock items', value: '26', change: '2.1%', direction: 'down', icon: 'orders', tone: 'purple', extra: 'below threshold' },
      { label: 'Units sold', value: '18,420', change: '14.3%', direction: 'up', icon: 'chart', tone: 'orange', extra: 'this month' },
      { label: 'Inventory value', value: '$432k', change: '5.7%', direction: 'up', icon: 'credit-card', tone: 'green', extra: 'vs target' },
    ],
  },
  'aug-2024': {
    cards: [
      { name: 'Aero Pro Headset', category: 'Audio', price: '$279.00', stock: '36 in stock', trend: '+11.8%', tone: 'blue' },
      { name: 'Luma Smartwatch', category: 'Wearables', price: '$189.00', stock: '21 in stock', trend: '+7.2%', tone: 'purple' },
      { name: 'Nova Backpack', category: 'Accessories', price: '$84.00', stock: '24 in stock', trend: '+4.9%', tone: 'orange' },
      { name: 'Pulse Speaker', category: 'Audio', price: '$139.00', stock: '17 in stock', trend: '+9.5%', tone: 'green' },
    ],
    bestsellers: [
      { name: 'Aero Pro Headset', sku: 'SKU-1842', sales: '1,134', revenue: '$316,706', status: 'Best seller' },
      { name: 'Luma Smartwatch', sku: 'SKU-2014', sales: '912', revenue: '$172,368', status: 'Trending' },
      { name: 'Nova Backpack', sku: 'SKU-0428', sales: '684', revenue: '$57,456', status: 'Popular' },
      { name: 'Pulse Speaker', sku: 'SKU-1109', sales: '548', revenue: '$76,172', status: 'Hot' },
    ],
    metrics: [
      { label: 'Total products', value: '1,210', change: '6.1%', direction: 'up', icon: 'bag', tone: 'blue', extra: 'vs last month' },
      { label: 'Low stock items', value: '31', change: '1.7%', direction: 'down', icon: 'orders', tone: 'purple', extra: 'below threshold' },
      { label: 'Units sold', value: '16,880', change: '12.2%', direction: 'up', icon: 'chart', tone: 'orange', extra: 'this month' },
      { label: 'Inventory value', value: '$401k', change: '4.8%', direction: 'up', icon: 'credit-card', tone: 'green', extra: 'vs target' },
    ],
  },
  'jul-2024': {
    cards: [
      { name: 'Aero Pro Headset', category: 'Audio', price: '$269.00', stock: '39 in stock', trend: '+10.4%', tone: 'blue' },
      { name: 'Luma Smartwatch', category: 'Wearables', price: '$179.00', stock: '23 in stock', trend: '+8.1%', tone: 'purple' },
      { name: 'Nova Backpack', category: 'Accessories', price: '$81.00', stock: '29 in stock', trend: '+3.8%', tone: 'orange' },
      { name: 'Pulse Speaker', category: 'Audio', price: '$134.00', stock: '19 in stock', trend: '+7.1%', tone: 'green' },
    ],
    bestsellers: [
      { name: 'Aero Pro Headset', sku: 'SKU-1842', sales: '1,042', revenue: '$280,498', status: 'Best seller' },
      { name: 'Luma Smartwatch', sku: 'SKU-2014', sales: '884', revenue: '$158,436', status: 'Trending' },
      { name: 'Nova Backpack', sku: 'SKU-0428', sales: '621', revenue: '$50,301', status: 'Popular' },
      { name: 'Pulse Speaker', sku: 'SKU-1109', sales: '502', revenue: '$67,268', status: 'Hot' },
    ],
    metrics: [
      { label: 'Total products', value: '1,192', change: '4.9%', direction: 'up', icon: 'bag', tone: 'blue', extra: 'vs last month' },
      { label: 'Low stock items', value: '34', change: '0.4%', direction: 'down', icon: 'orders', tone: 'purple', extra: 'below threshold' },
      { label: 'Units sold', value: '15,410', change: '9.8%', direction: 'up', icon: 'chart', tone: 'orange', extra: 'this month' },
      { label: 'Inventory value', value: '$382k', change: '4.3%', direction: 'up', icon: 'credit-card', tone: 'green', extra: 'vs target' },
    ],
  },
  'jun-2024': {
    cards: [
      { name: 'Aero Pro Headset', category: 'Audio', price: '$259.00', stock: '33 in stock', trend: '+9.6%', tone: 'blue' },
      { name: 'Luma Smartwatch', category: 'Wearables', price: '$174.00', stock: '26 in stock', trend: '+6.8%', tone: 'purple' },
      { name: 'Nova Backpack', category: 'Accessories', price: '$79.00', stock: '31 in stock', trend: '+2.9%', tone: 'orange' },
      { name: 'Pulse Speaker', category: 'Audio', price: '$129.00', stock: '21 in stock', trend: '+6.5%', tone: 'green' },
    ],
    bestsellers: [
      { name: 'Aero Pro Headset', sku: 'SKU-1842', sales: '998', revenue: '$258,482', status: 'Best seller' },
      { name: 'Luma Smartwatch', sku: 'SKU-2014', sales: '842', revenue: '$146,508', status: 'Trending' },
      { name: 'Nova Backpack', sku: 'SKU-0428', sales: '588', revenue: '$46,452', status: 'Popular' },
      { name: 'Pulse Speaker', sku: 'SKU-1109', sales: '476', revenue: '$61,404', status: 'Hot' },
    ],
    metrics: [
      { label: 'Total products', value: '1,146', change: '3.6%', direction: 'up', icon: 'bag', tone: 'blue', extra: 'vs last month' },
      { label: 'Low stock items', value: '38', change: '0.8%', direction: 'down', icon: 'orders', tone: 'purple', extra: 'below threshold' },
      { label: 'Units sold', value: '14,290', change: '8.7%', direction: 'up', icon: 'chart', tone: 'orange', extra: 'this month' },
      { label: 'Inventory value', value: '$355k', change: '3.6%', direction: 'up', icon: 'credit-card', tone: 'green', extra: 'vs target' },
    ],
  },
}

type ProductFormState = { name: string; category: string; price: string; stock: string }

const emptyProductForm = { name: '', category: '', price: '', stock: '' }

function ProductsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('current')
  const [customProducts, setCustomProducts] = useState<Array<{ name: string; category: string; price: string; stock: string; trend: string; tone: 'blue' | 'purple' | 'orange' | 'green' }>>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState<ProductFormState>(emptyProductForm)
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ProductFormState, string>>>({})
  const nameInputRef = useRef<HTMLInputElement | null>(null)
  const periodData = productsByPeriod[selectedPeriod] ?? productsByPeriod.current
  const productCards = [...customProducts, ...periodData.cards].slice(0, 6)
  const bestselling = periodData.bestsellers

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

  const handleFieldChange = (field: keyof ProductFormState, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }))
    setFormErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleAddProduct = () => {
    const nextErrors: Partial<Record<keyof ProductFormState, string>> = {}

    if (!formData.name.trim()) {
      nextErrors.name = 'Product name is required.'
    }
    if (!formData.category.trim()) {
      nextErrors.category = 'Category is required.'
    }
    if (!formData.price.trim()) {
      nextErrors.price = 'Price is required.'
    }
    if (!formData.stock.trim()) {
      nextErrors.stock = 'Stock quantity is required.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors)
      return
    }

    const newProduct = {
      name: formData.name.trim(),
      category: formData.category.trim(),
      price: `$${Number(formData.price).toFixed(2)}`,
      stock: `${formData.stock} in stock`,
      trend: '+12.8%',
      tone: 'blue' as const,
    }

    setCustomProducts((current) => [newProduct, ...current].slice(0, 6))
    setFormData(emptyProductForm)
    setFormErrors({})
    setIsModalOpen(false)
  }

  const handleCloseModal = () => {
    setFormData(emptyProductForm)
    setFormErrors({})
    setIsModalOpen(false)
  }

  return (
    <section className="page-shell" aria-labelledby="products-title">
      <div className="page-header">
        <div>
          <p className="section-kicker">Catalog</p>
          <h2 id="products-title">Products</h2>
          <p className="page-subtitle">Manage inventory, bestseller performance, and product visibility.</p>
        </div>
        <div className="dashboard-actions">
          <DateSelector options={productPeriodOptions} value={selectedPeriod} onChange={setSelectedPeriod} />
          <button className="download-button" type="button" onClick={() => setIsModalOpen(true)}>
            <Icon name="bag" size={16} /> New product
          </button>
        </div>
      </div>

      <div className="stats-grid">
        {periodData.metrics.map((stat) => (
          <article key={stat.label} className="stat-card">
            <div className={`stat-icon stat-icon-${stat.tone}`}>
              <Icon name={stat.icon} size={20} />
            </div>
            <p className="stat-label">{stat.label}</p>
            <strong className="stat-value">{stat.value}</strong>
            <p className={`stat-change ${stat.direction}`}><Icon name={stat.direction === 'up' ? 'arrow-up' : 'arrow-down'} size={14} /> {stat.change} <span>{stat.extra}</span></p>
          </article>
        ))}
      </div>

      <div className="product-grid">
        {productCards.map((product) => (
          <article key={`${product.name}-${product.price}`} className="product-card">
            <div className={`product-media ${product.tone}`}>
              <span>{product.category}</span>
            </div>
            <div className="product-meta">
              <div className="product-row">
                <h3>{product.name}</h3>
                <span className="product-trend positive">{product.trend}</span>
              </div>
              <p>{product.category}</p>
              <div className="product-row product-row-bottom">
                <strong>{product.price}</strong>
                <span>{product.stock}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="panel product-table-panel">
        <div className="panel-heading">
          <div>
            <p className="section-kicker">Performance</p>
            <h3>Bestselling products</h3>
          </div>
          <button className="text-button" type="button">View all</button>
        </div>

        <div className="orders-table-wrap">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Sales</th>
                <th>Revenue</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bestselling.map((row) => (
                <tr key={`${row.name}-${row.sku}`}>
                  <td><strong>{row.name}</strong></td>
                  <td className="muted-cell">{row.sku}</td>
                  <td>{row.sales}</td>
                  <td className="amount-cell">{row.revenue}</td>
                  <td><span className="status completed">{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="customer-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title" onClick={(event) => event.stopPropagation()}>
            <div className="customer-modal-header">
              <div>
                <p className="section-kicker">Catalog</p>
                <h3 id="product-modal-title">Add product</h3>
              </div>
              <button type="button" className="icon-button small" aria-label="Close product modal" onClick={handleCloseModal}>
                <Icon name="more" size={16} />
              </button>
            </div>

            <div className="customer-form">
              <div className="form-field">
                <label htmlFor="product-name">Product name</label>
                <input id="product-name" ref={nameInputRef} type="text" value={formData.name} onChange={(event) => handleFieldChange('name', event.target.value)} placeholder="Aero Pro Headset" aria-invalid={Boolean(formErrors.name)} />
                {formErrors.name && <span className="field-error">{formErrors.name}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="product-category">Category</label>
                <input id="product-category" type="text" value={formData.category} onChange={(event) => handleFieldChange('category', event.target.value)} placeholder="Audio" aria-invalid={Boolean(formErrors.category)} />
                {formErrors.category && <span className="field-error">{formErrors.category}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="product-price">Price</label>
                <input id="product-price" type="number" min="0" step="0.01" value={formData.price} onChange={(event) => handleFieldChange('price', event.target.value)} placeholder="249.00" aria-invalid={Boolean(formErrors.price)} />
                {formErrors.price && <span className="field-error">{formErrors.price}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="product-stock">Stock / quantity</label>
                <input id="product-stock" type="number" min="0" value={formData.stock} onChange={(event) => handleFieldChange('stock', event.target.value)} placeholder="50" aria-invalid={Boolean(formErrors.stock)} />
                {formErrors.stock && <span className="field-error">{formErrors.stock}</span>}
              </div>
            </div>

            <div className="customer-modal-actions">
              <button type="button" className="secondary-action" onClick={handleCloseModal}>Cancel</button>
              <button type="button" className="download-button" onClick={handleAddProduct}>Add Product</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductsPage
