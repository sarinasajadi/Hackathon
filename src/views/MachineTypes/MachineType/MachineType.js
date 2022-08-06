import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import { Row, Button } from 'antd';
import { useLocation } from 'react-router-dom';
import Type from './components/Type';

const MachineType = (props) => {
    const location = useLocation();
    const typeOfMachine = location.pathname.split('/')[location.pathname.split('/').length -1];
    const [fields, setFields] = useState([]);
    const [maintitle, setMainTitle] = useState([]);
    const [typesList, setTypesList] = useState([]);
    const [storedTypes, setStoredTypes] = useState([]);

    useEffect(() => {
        const item = props.menuItem.find((item) => item.label?.props?.children === typeOfMachine)?.key;
        if (item) {
            const storedType = JSON.parse(localStorage.getItem(`type${item}`));
            setFields(storedType.fields);
            setMainTitle(storedType.type);
        }

    }, [props.menuItem])

    useEffect(() => {
        if (localStorage.getItem(`typeList${maintitle}`)) {
            const stored = localStorage.getItem(`typeList${maintitle}`).split(',');
            if (stored.length > 0) {
                setStoredTypes(stored);
            }
        }
    }, [props.menuItem])

    useEffect(() => {
        if (storedTypes.length > 0) {
            localStorage.setItem(`typeList${maintitle}`, storedTypes);
        }
        if (storedTypes !== 'null' && typesList?.length !== storedTypes?.length) {
            const _types = [];
            storedTypes?.map((type) => {
                _types.push(<Type id={type} fields={fields} maintitle={maintitle} value={JSON.parse(localStorage.getItem(`${maintitle}${type}`))}  />)
            })
            setTypesList(_types);
        }
    }, [storedTypes])
        
        

    const addNewType = () => {
        const key = storedTypes.length > 0 ? Number(storedTypes[storedTypes.length - 1]) + 1 : typesList.length;
        setTypesList(types => [...types, <Type key={key} id={key} fields={fields} maintitle={maintitle}  />]);
    }

    return (
        <Row> 
            {typesList}
            <Button type='primary' onClick={addNewType}>Add Type</Button>
        </Row>
    )
}

const mapStateToProps = state => {
    return {
        menuItem: state.menuReducer.menuItem,
    }
  };

export default connect(mapStateToProps)(MachineType);