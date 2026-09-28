import { useState } from 'react'
import Icon from './Icon'
import ProductFilterPanel from './ProductFilterPanel'

export interface ProductItem {
  id: string
  name: string
  productNo: string
  category: string
  date: string
  price: string
  status: 'Available' | 'Disabled'
}

interface ProductsTableProps {
  products: ProductItem[]
  selectedIds: string[]
  onToggleSelectAll: () => void
  onToggleSelectRow: (id: string) => void
  searchTerm: string
  onSearchChange: (term: string) => void
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  onExport: () => void
}

function ProductsTable({
  products,
  selectedIds,
  onToggleSelectAll,
  onToggleSelectRow,
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  onExport,
}: ProductsTableProps) {
  const [activeActionsMenu, setActiveActionsMenu] = useState<string | null>(null)
  const [isActionsOpen, setIsActionsOpen] = useState(false)
  const isAllSelected = products.length > 0 && products.every((p) => selectedIds.includes(p.id))

  return (
    <div className="products-table-card">
      {/* Search & Actions Toolbar */}
      <div className="table-toolbar">
        <div className="search-box">
          <Icon name="search" size={16} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="toolbar-right">
          <ProductFilterPanel
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
          />
          <div className="product-actions-wrapper">
            <button
              type="button"
              className="toolbar-actions-btn"
              aria-expanded={isActionsOpen}
              aria-haspopup="menu"
              onClick={() => setIsActionsOpen((open) => !open)}
            >
              <Icon name="more" size={15} /> Actions
            </button>
            {isActionsOpen && (
              <div className="product-actions-menu" role="menu">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    onToggleSelectAll()
                    setIsActionsOpen(false)
                  }}
                >
                  {isAllSelected ? 'Clear page selection' : 'Select all on page'}
                </button>
                <button
                  type="button"
                  role="menuitem"
                  disabled={selectedIds.length === 0}
                  onClick={() => {
                    onExport()
                    setIsActionsOpen(false)
                  }}
                >
                  Export selected
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="table-responsive">
        <table className="products-table">
          <thead>
            <tr>
              <th className="checkbox-col">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={onToggleSelectAll}
                  />
                  <span className="checkmark" />
                </label>
              </th>
              <th>
                <div className="th-content">
                  PRODUCT NAME <Icon name="chevron-down" size={12} />
                </div>
              </th>
              <th>
                <div className="th-content">
                  PRODUCT NO. <Icon name="chevron-down" size={12} />
                </div>
              </th>
              <th>
                <div className="th-content">
                  CATEGORY <Icon name="chevron-down" size={12} />
                </div>
              </th>
              <th>
                <div className="th-content">
                  DATE <Icon name="chevron-down" size={12} />
                </div>
              </th>
              <th>
                <div className="th-content">
                  PRICE <Icon name="chevron-down" size={12} />
                </div>
              </th>
              <th>
                <div className="th-content">
                  STATUS <Icon name="chevron-down" size={12} />
                </div>
              </th>
              <th className="actions-col" />
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={8} className="empty-state-cell">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const isSelected = selectedIds.includes(product.id)
                return (
                  <tr key={product.id} className={isSelected ? 'selected-row' : ''}>
                    <td className="checkbox-col">
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onToggleSelectRow(product.id)}
                        />
                        <span className="checkmark" />
                      </label>
                    </td>
                    <td className="product-name-cell">{product.name}</td>
                    <td className="muted-cell">{product.productNo}</td>
                    <td className="category-cell">{product.category}</td>
                    <td className="date-cell">{product.date}</td>
                    <td className="price-cell">{product.price}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          product.status === 'Available' ? 'available' : 'disabled'
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="actions-col">
                      <div className="row-actions-wrapper">
                        <button
                          type="button"
                          className="icon-row-btn"
                          aria-label="Row actions"
                          onClick={() =>
                            setActiveActionsMenu(
                              activeActionsMenu === product.id ? null : product.id
                            )
                          }
                        >
                          <Icon name="more" size={16} />
                        </button>
                        {activeActionsMenu === product.id && (
                          <div className="row-menu-dropdown">
                            <button type="button">Edit Product</button>
                            <button type="button" className="text-danger">
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductsTable

