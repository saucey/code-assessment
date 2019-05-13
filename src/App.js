
import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { fromEvent, from } from 'rxjs';
import { map } from 'rxjs/operators';

const scrollEvent$ = fromEvent(window, 'scroll');

class App extends Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);

    this.state = {
        active: true
    };
  }

  toggle() {
    this.setState({ active: !this.state.active });
  }

  scrolling = scrollEvent$.pipe(map((e) => {
      return {
          windowScrollTop: document.documentElement.scrollTop,
          docHeight: document.documentElement.scrollHeight,
          windowHeight: document.documentElement.clientHeight
      };
  })).subscribe(
    x => {
      const distanceToBottom = x.docHeight - x.windowHeight - x.windowScrollTop;  
      if (distanceToBottom < 190) {
        this.renderNextPage();
      }
    },
    e => console.log('err', e),
    _ => console.log('Completed'));;
  
  renderNextPage() {
    this.props.fetchImages();
  }

  toggleData(key) {
    this.setState({
      active: !this.state.active
    });
  }
  
  render() {
    return <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href={this.props.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {this.props.message}
        </a>
      </header>
      <ul className="img-list">
        {this.props.payload.map((image, index) => {
          return  <ImageList
              onClick={this.toggle}
              toggleData={this.toggleData}
              title={image.title}
              thumbnailUrl={!this.state.active ? ' https://picsum.photos/150/150': image.thumbnailUrl}
              key={index}
          />
        })}
      </ul>
    </div>;
}
}

const ImageList = ({title, thumbnailUrl, onClick}) => (
  <li onClick={onClick}>
    <img src={thumbnailUrl}/>
      {title}
  </li>
)

const mapStateToProps = state => ({
  message: state.message,
  href: state.href,
  payload: state.payload
});

const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch({type: 'fetch'}),
  fetchImages: () => dispatch({type: 'fetchImages'}),
  fetchInitImages: () => dispatch({type: 'fetchInitImages'})
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
