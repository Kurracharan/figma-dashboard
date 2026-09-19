import Icon from '../components/Icon'

const helpTopics = [
  { title: 'Getting started', detail: 'Store setup, onboarding, and first steps', tone: 'blue' },
  { title: 'Payments', detail: 'Billing status, payouts, and transaction issues', tone: 'purple' },
  { title: 'Orders', detail: 'Returns, fulfillment, and order management', tone: 'orange' },
  { title: 'Account security', detail: 'Access, verification, and team permissions', tone: 'green' },
]

const articleList = [
  { title: 'How to update shipping rules', meta: '5 min read' },
  { title: 'Troubleshooting failed payments', meta: '4 min read' },
  { title: 'Best practices for product launches', meta: '7 min read' },
]

function HelpCenterPage() {
  return (
    <section className="page-shell" aria-labelledby="help-center-title">
      <div className="page-header">
        <div>
          <p className="section-kicker">Support</p>
          <h2 id="help-center-title">Help center</h2>
          <p className="page-subtitle">Browse guides, support topics, and quick fixes for your store.</p>
        </div>
        <div className="dashboard-actions">
          <button className="date-button" type="button">
            <Icon name="search" size={16} /> Search topics
          </button>
          <button className="download-button" type="button">
            <Icon name="help" size={16} /> Contact support
          </button>
        </div>
      </div>

      <div className="help-grid">
        {helpTopics.map((topic) => (
          <article key={topic.title} className="help-card">
            <div className={`help-card-icon ${topic.tone}`}>
              <Icon name={topic.tone === 'blue' ? 'grid' : topic.tone === 'purple' ? 'credit-card' : topic.tone === 'orange' ? 'orders' : 'users'} size={20} />
            </div>
            <h3>{topic.title}</h3>
            <p>{topic.detail}</p>
            <button type="button" className="text-button">Open topic</button>
          </article>
        ))}
      </div>

      <section className="panel help-articles-panel">
        <div className="panel-heading">
          <div>
            <p className="section-kicker">Popular articles</p>
            <h3>Latest guides</h3>
          </div>
          <button className="text-button" type="button">View all</button>
        </div>

        <div className="article-list">
          {articleList.map((article) => (
            <div key={article.title} className="article-row">
              <div className="article-copy">
                <strong>{article.title}</strong>
                <span>{article.meta}</span>
              </div>
              <button className="icon-button small" type="button" aria-label={`Open ${article.title}`}>
                <Icon name="arrow-up" size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}

export default HelpCenterPage
