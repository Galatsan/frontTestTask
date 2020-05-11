import * as React from "react";
import { imageService } from "../service/imageService";
import Navigation from '../components/navigation'
import ImageGalery from "../components/image-galery";
import ImageView from '../components/imageView'

export default class ImageViwer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { page: {}, selectedPicture: null };

    this.setImages = this.setImages.bind(this);
    this.setFirstPage = this.setFirstPage.bind(this);
    this.setLastPage = this.setLastPage.bind(this);
    this.setPrevPage = this.setPrevPage.bind(this);
    this.setNextPage = this.setNextPage.bind(this);
    this.setSelectedImage = this.setSelectedImage.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.nextPicture = this.nextPicture.bind(this)
    this.prevPicture = this.prevPicture.bind(this)
    this.setNextPrevPicture = this.setNextPrevPicture.bind(this)
  }

  async componentDidMount() {
    const items = await imageService.getImagePage();
    this.setState({ page: items });
  }

  async prevPicture(currentId) { await this.setNextPrevPicture(currentId, false) }
  async nextPicture(currentId) { await this.setNextPrevPicture(currentId, true) }

  async setNextPrevPicture(currentId, next) {
    const index = this.state.page.pictures.findIndex(i => i.id === currentId)
    if (index === undefined) {
      return
    }
    const prevItem = this.state.page.pictures[next === true ? index + 1 : index -1]
    if (prevItem !== undefined) {
      await this.setSelectedImage(prevItem.id)
    }
    else {
      next === true ? await this.setNextPage() : await this.setPrevPage()
      const itemToQuery = next === true ?  this.state.page.pictures[0] : this.state.page.pictures[this.state.page.pictures.length - 1]
      await this.setSelectedImage(itemToQuery.id)
    }
  }

  async setSelectedImage(id) {
    const image = await imageService.getImage(id)
    this.setState({ selectedPicture: image });
  }

  async setFirstPage() { await this.setImages() }
  async setLastPage() { await this.setImages(this.state.page.pageCount) }
  async setPrevPage() { await this.setImages(this.state.page.page - 1) }
  async setNextPage() { await this.setImages(this.state.page.page + 1) }

  async setImages(pageNumber) {
    const page = pageNumber || 1
    if (page > 0 && page <= this.state.page.pageCount) {
      const item = await imageService.getImagePage(page);
      this.setState({ page: item });
    }
  }

  hideModal() { this.setState({ selectedPicture: null });}


  render() {
    return <div>
      <div className="container-fluid mt-2">
        <div className="row justify-content-center">
          <ImageGalery pictures={this.state.page.pictures} pickImage={this.setSelectedImage}/>
        </div>
        <Navigation
          setFirstPage={this.setFirstPage}
          setPrevPage={this.setPrevPage}
          setNextPage={this.setNextPage}
          setLastPage={this.setLastPage}
          page={this.state.page.page}
          pageCount={this.state.page.pageCount} />
      </div>
      <ImageView 
        picture={this.state.selectedPicture}
        onHide={this.hideModal}
        prevPicture={this.prevPicture}
        nextPicture={this.nextPicture} />
    </div>
  }

};

