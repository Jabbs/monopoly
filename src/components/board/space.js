import React, { Component } from 'react';

export default class Space extends Component {
  render() {
    return(
      <div className="space">
        <div className={`space-${this.props.type}`}>
          {this.props.name}
        </div>
        <div className="price-footer">
          {this.props.price}
        </div>
      </div>
    );
  }
}
