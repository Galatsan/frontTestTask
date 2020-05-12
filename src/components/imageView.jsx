import * as React from "react";
import Modal from "react-bootstrap/Modal";
import * as Share from 'react-share'
import './imageView.css'

export default class ImageView extends React.Component {

  constructor(props) {
    super(props);
    this.prevPicture = this.prevPicture.bind(this);
    this.nextPicture = this.nextPicture.bind(this);
  }

  prevPicture() {
    this.props.prevPicture(this.props.picture.id)
  }

  nextPicture() {
    this.props.nextPicture(this.props.picture.id)
  }

  render() {
    return (
      this.props.picture ?
        <Modal
          size="xl"
          show={this.props.picture}
          onHide={this.props.onHide}>
          <Modal.Body>
            <div className="container-fluid">
              <div className="row mb-3">
                <div className="col">
                  {this.props.picture.author}. {this.props.picture.camera}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  {this.props.picture.tags}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-4">
                  <button type="button" className="btn btn-block btn-dark" onClick={this.prevPicture}>
                    {'<'}
                  </button>
                </div>
                <div className="col-4">
                    <div className="network">
                      <Share.FacebookMessengerShareButton url={this.props.picture.full_picture} className="network-share-button">
                        <Share.FacebookMessengerIcon size={32} round />
                      </Share.FacebookMessengerShareButton>
                    </div>
                    <div className="network">
                      <Share.LinkedinShareButton url={this.props.picture.full_picture}  className="network-share-button">
                        <Share.LinkedinIcon size={32} round />
                      </Share.LinkedinShareButton>
                    <div className="network">
                    </div>
                      <Share.TwitterShareButton url={this.props.picture.full_picture}  className="network-share-button">
                        <Share.TwitterIcon size={32} round />
                      </Share.TwitterShareButton>
                    </div>
                    <div className="network">
                      <Share.TelegramShareButton url={this.props.picture.full_picture}  className="network-share-button">
                        <Share.TelegramIcon size={32} round />
                      </Share.TelegramShareButton>
                    </div>
                    <div className="network">
                      <Share.EmailShareButton url={this.props.picture.full_picture} subject={'Picture from agile'} body="body"  className="network-share-button">
                        <Share.EmailIcon size={32} round />
                      </Share.EmailShareButton>
                    </div>
                </div>
                <div className="col-4">
                  <button type="button" className="btn btn-block btn-dark" onClick={this.nextPicture}>
                    {'>'}
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <img src={this.props.picture.full_picture} className="img-fluid rounded" />
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal> : null
    );
  }
} 