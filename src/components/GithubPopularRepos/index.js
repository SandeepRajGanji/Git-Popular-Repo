import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
// Write your code here
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class GithubPopularRepos extends Component {
  state = {
    activeTabId: languageFiltersData[0].id,
    tabItemData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepositoryData()
  }

  getRepositoryData = async () => {
    const {activeTabId} = this.state

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`

    const response = await fetch(apiUrl)

    if (response.ok === true) {
      const data = await response.json()
      const filteredData = data.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))

      this.setState({
        tabItemData: filteredData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickChangeTab = id => {
    //  console.log(id)
    this.setState(
      {
        activeTabId: id,
      },
      this.getRepositoryData,
    )
  }

  renderLanguageContainer = () => {
    const {activeTabId} = this.state
    return (
      <>
        <ul className="language-filter-container">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              key={eachLanguage.id}
              languageDetails={eachLanguage}
              isActive={eachLanguage.id === activeTabId}
              onClickChangeTab={this.onClickChangeTab}
            />
          ))}
        </ul>
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderRepositoryItemsContainerView = () => {
    const {tabItemData} = this.state

    return (
      <ul className="language-cards-container">
        {tabItemData.map(eachItem => (
          <RepositoryItem key={eachItem.id} languageCardDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryItemsContainerView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="git-popular-repo-container">
        <h1 className="git-popular-repo-heading">Popular</h1>
        {this.renderLanguageContainer()}
        {this.renderRepositories()}
      </div>
    )
  }
}
export default GithubPopularRepos
