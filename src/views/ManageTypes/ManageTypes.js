import React, { useEffect, useState } from 'react';
import { Button, Row } from 'antd'
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import Type from './components/Type';
import { Link } from 'react-router-dom';

const ManageTypes = (props) => {
    const [storedTypes, setStoredTypes] = useState([]);
    const [types, setTypes] = useState([]);

    const removeType = (index) => {
        const stored = localStorage.getItem('typeList').split(',');
        const removeIndex = stored.findIndex((element) => String(element) === String(index));
        stored.splice(removeIndex, 1);
        localStorage.setItem('typeList', storedTypes);
        localStorage.removeItem(`type${index}`)
        setStoredTypes(stored);
        props.RemoveTypeFromMenu(index);
    }

    useEffect(() => {
        if (localStorage.getItem('typeList')) {
            const stored = localStorage.getItem('typeList').split(',');
            if (stored.length > 0) {
                setStoredTypes(stored);
            }
        }
    }, [])

    useEffect(() => {
        if (storedTypes.length > 0) {
            localStorage.setItem('typeList', storedTypes);
        }
        if (storedTypes !== 'null' && types?.length !== storedTypes?.length) {
            const _types = [];
            storedTypes?.map((type) => {
                _types.push(<Type id={type} value={JSON.parse(localStorage.getItem(`type${type}`))} removeType={removeType} addNewTypeToMenu={addNewTypeToMenu} />)
            })
            setTypes(_types);
        }
    }, [storedTypes])

    const addNewType = () => {
        const key = storedTypes.length > 0 ? Number(storedTypes[storedTypes.length - 1]) + 1 : types.length;
        setTypes(types => [...types, <Type id={key} key={key} removeType={removeType} addNewTypeToMenu={addNewTypeToMenu} />]);
        setStoredTypes(storedTypes => [...storedTypes, storedTypes.length > 0 ? Number(storedTypes[storedTypes.length - 1]) + 1 : types.length]);
    }

    const addNewTypeToMenu = (val, id) => {
        if (val) {
            props.AddTypeToMenu(<Link to={`/machine-type/${val}`}>{val}</Link>, id)
        } else {
            props.RemoveTypeFromMenu(id);
        }
    };
    return (
        <Row gutter={16}> 
            {types}
            <Button type='primary' onClick={addNewType}>Add Type</Button>
        </Row>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        AddTypeToMenu: (value, id) => dispatch({type: actionTypes.ADD_TO_MENU, value: value, id: id}),
        RemoveTypeFromMenu: (id) => dispatch({type: actionTypes.REMOVE_FROM_MENU, id: id}),
    }
};

export default connect(null, mapDispatchToProps)(ManageTypes);