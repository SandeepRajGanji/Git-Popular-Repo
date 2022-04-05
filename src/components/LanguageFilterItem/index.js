// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, isActive, onClickChangeTab} = props

  const {id, language} = languageDetails

  const className = isActive
    ? 'language-classname language-active'
    : 'language-classname'

  const changeTab = () => {
    onClickChangeTab(id)
  }

  return (
    <li>
      <button type="button" className="button" onClick={changeTab}>
        <p className={className}>{language}</p>
      </button>
    </li>
  )
}

export default LanguageFilterItem
