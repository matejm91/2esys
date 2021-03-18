import React from 'react';
import {Delete} from '@material-ui/icons';
import {Container} from '@material-ui/core';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router';
import logo from 'assets/image/logo.jpg';
import 'assets/style/pageLayout.css';

class PageLayout extends React.Component {
  handleMenuItemCLick = (link) => {
    this.props.history.push(link);
  }

  render() {
    const menus = [
      { text: 'Airports', link: '/airports' },
      { text: 'Airlines', link: '/airlines' },
      { text: 'Countries', link: '/countries' },
    ];
    return (
        <Container fixed>
          <div className='twoesys-pageLayout__navBar'>
            <img className='twoesys-pageLayout__logo' src={logo}/>
            <div className='twoesys-pageLayout__menu'>
              {menus.map((menuItem, i) => (
                <div key={i} className='twoesys-pageLayout__menuItem'>
                  <div onClick={() => this.handleMenuItemCLick(menuItem.link)}>{menuItem.text}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={'twoesys-pageLayout__pageBody'}>
            {this.props.children}
          </div>
        </Container>
    );
  }
}

export default withRouter(PageLayout);