import * as React from "react";

export default class Navigation extends React.Component {

  render() {
    return <nav aria-label="Page navigation example" className="mt-2">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#" onClick={this.props.setFirstPage}>{'<<'}</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" onClick={this.props.setPrevPage}>{'<'}</a>
          </li>
          <li className="page-item disable">
            <a className="page-link" href="#">{`${this.props.page} / ${this.props.pageCount}`}</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" onClick={this.props.setNextPage}>{'>'}</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" onClick={this.props.setLastPage}>{'>>'}</a>
          </li>
        </ul>
      </nav>
  }

};

