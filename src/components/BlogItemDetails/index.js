import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

const dummyblogData = {
  title: 'Blog Name',
  imageUrl: 'https://assets.ccbp.in/frontend/react-js/placeholder-3-img.png',
  avatarUrl: 'https://assets.ccbp.in/frontend/react-js/avatar-img.png',
  author: 'Author Name',
  content:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
}

class BlogItemDetails extends Component {
  state = {blogData: {}, isLoading: true}

  componentDidMount() {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const each = await response.json()
    const updatedData = {
      id: each.id,
      title: each.title,
      author: each.author,
      avatarUrl: each.avatar_url,
      content: each.content,
      imageUrl: each.image_url,
      topic: each.topic,
    }
    this.setState({blogData: updatedData, isLoading: false})
  }

  renderBlogItemDetails = () => {
    const {blogData, isLoading} = this.state
    const {title, imageUrl, content, avatarUrl, author} = blogData
    return isLoading ? (
      <Loader />
    ) : (
      <div className="blog-info">
        <h2 className="blog-details-title">{title}</h2>

        <div className="author-details">
          <img className="author-pic" src={avatarUrl} alt={author} />
          <p className="details-author-name">{author}</p>
        </div>

        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }

  render() {
    return <div className="blog-container">{this.renderBlogItemDetails()}</div>
  }
}

export default BlogItemDetails
