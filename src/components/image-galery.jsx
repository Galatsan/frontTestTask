import * as React from "react";
import './image-galery.css'

export default class ImageGalery extends React.Component {

  constructor(props) {
    super(props);
    this.clickOnImg = this.clickOnImg.bind(this);
  }

  clickOnImg(e) { this.props.pickImage(e.target.getAttribute('id')) }

  render() {
    const pictures = this.props.pictures || []
    const imgs = pictures.map(pic =>
      <img id={pic.id} key={pic.id} className="imageView rounded" src={pic.cropped_picture} onClick={this.clickOnImg} />
    )
    return [imgs]
  }

};