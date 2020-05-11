import * as React from "react";
import Modal from "react-bootstrap/Modal";

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
                  <button type="button" className="btn btn-block btn-success">
                    Share
                  </button>
                </div>
                <div className="col-4">
                  <button type="button" className="btn btn-block btn-dark" onClick={this.nextPicture}>
                    {'>'}
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <img src={this.props.picture.full_picture} className="img-fluid rounded justify-content-center" />
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal> : null
    );
  }
} 