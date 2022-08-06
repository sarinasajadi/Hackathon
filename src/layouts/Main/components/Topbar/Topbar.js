import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import * as actionTypes from '../../../../store/actions';

const Topbar = (props) => {
  const [menus, setMenus] = useState([])

  useEffect(() => {
    if (localStorage.getItem('typeList')) {
        const stored = localStorage.getItem('typeList').split(',');
        if (stored.length > 0) {
          stored?.map((type) => {
            props.AddTypeToMenu(<a href={`/machin-type/${JSON.parse(localStorage.getItem(`type${type}`)).type}`}>{JSON.parse(localStorage.getItem(`type${type}`)).type}</a>, type);
          })
        }
    }
  }, [])

  useEffect(() => {
    const _menu = [{
      key: 100,
      label: <a href='/manage-types'>Manage Types</a>,
    }];
    props.menuItem.map((item) => {
      if (!_menu.includes(item)) {
        _menu.push(item);
      }
    })
    setMenus(_menu)
  }, [props.menuItem])

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      items={menus}
    />
  );
};

const mapStateToProps = state => {
  return {
      menuItem: state.menuReducer.menuItem,
  }
};

const mapDispatchToProps = dispatch => {
  return {
      AddTypeToMenu: (value, id) => dispatch({type: actionTypes.ADD_TO_MENU, value: value, id: id}),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
