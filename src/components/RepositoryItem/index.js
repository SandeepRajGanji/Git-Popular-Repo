// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {languageCardDetails} = props
  const {
    starsCount,
    avatarUrl,
    forksCount,
    issuesCount,
    name,
  } = languageCardDetails
  return (
    <li className="language-item-card">
      <img src={avatarUrl} alt={name} className="language-item-card-image" />
      <h1 className="language-item-card-heading">{name}</h1>
      <div>
        <div className="language-item-card-count-details-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            className="language-item-card-count-image"
            alt="stars"
          />
          <p className="language-item-card-count">{starsCount} stars</p>
        </div>
        <div className="language-item-card-count-details-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            className="language-item-card-count-image"
            alt="forks"
          />
          <p className="language-item-card-count">{forksCount} forks</p>
        </div>
        <div className="language-item-card-count-details-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            className="language-item-card-count-image"
            alt="open issues"
          />
          <p className="language-item-card-count">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}
export default RepositoryItem
