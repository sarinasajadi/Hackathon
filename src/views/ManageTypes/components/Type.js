import React, { useEffect, useState } from 'react';
import { Col, Card, Input, Select } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons';
import { FIELDS_TYPE } from '../../../constants/FieldsType';

const { Option } = Select;

const Type = ({ id, value = null, removeType = undefined, addNewTypeToMenu = undefined }) => {
    const [typeObj, setTypeObj] = useState({
        type: '',
        title: '',
        fields: [
            {
                name: 'Title',
                type: 'Small text',
                value: 'Title',
            },

        ]
    });

    useEffect(() => {
        if (value) {
            setTypeObj(value);
        }
    }, [value])

    useEffect(() => {
        addNewTypeToMenu(typeObj.type, id);
    }, [typeObj.type])

    const onChange = (e) => {
        setTypeObj(prevState => ({
            ...prevState,
            [e.currentTarget.name]: e.currentTarget.value,
        }))
    };

    const onChangeFields = (e, index) => {
        const _typeObj = {...typeObj};
        _typeObj.fields[index].value = e.currentTarget.value; 
        setTypeObj(_typeObj);
    }

    const handleSelectChange = (value, index) => {
        const _typeObj = {...typeObj};
        if (value === 'Remove') {
            _typeObj.fields.splice(index, 1);
        } else {
            _typeObj.fields[index].type = value;
        }
        setTypeObj(_typeObj);
    }

    const addNewField = (value) => {
        const _typeObj = {...typeObj};
        _typeObj.fields.push({
            name: `field${_typeObj.fields.length}`,
            type: value,
            value: '',
        })
        setTypeObj(_typeObj);
    }

    useEffect(() => {
        localStorage.setItem(`type${id}`, JSON.stringify(typeObj))
    }, [typeObj]);
    return (
        <Col className="gutter-row" span={4} key={id}>
            <Card size="small"  title={typeObj.type || 'New Type'} style={{ width: '100%' }} extra={<button onClick={() => removeType(id)}><CloseCircleOutlined /></button>}>
                <label key='typeLabel'>Object type</label>
                <Input name='type' key='type' value={typeObj.type} onChange={onChange} />
                <label key='titleLabel'>Object title</label>
                <Input name='title' key='title' value={typeObj.title} onChange={onChange} />
                <label key='fieldsLabel'>Fields</label>
                {typeObj.fields.map((field, index) => {
                    return <Input
                        name={field.name}
                        key={index}
                        value={field.value}
                        onChange={(e) => onChangeFields(e, index)}
                        placeholder='Enter field name'
                        addonAfter={
                            <Select defaultValue={field.type} className="select-after" onChange={(value) => handleSelectChange(value, index)}>
                                {FIELDS_TYPE.map((fieldName, index) => {
                                    return <Option value={fieldName} key={index}>{fieldName}</Option>
                                })}
                                <Option value='Remove' key='remove'>Remove</Option>
                            </Select>
                        }
                        style={{marginBottom: '10px'}}
                    />
                })}
                <Select
                    placeholder="Add Field"
                    optionFilterProp="children"
                    onChange={addNewField}
                    value='Add Field'
                    style={{ width: '100%', textAlign: 'center', marginTop: '10px', backgroundColor: '#606972'}}
                >
                    {FIELDS_TYPE.map((fieldName, index) => {
                        return <Option value={fieldName} key={index}>{fieldName}</Option>
                    })}
                </Select>
            </Card>
        </Col>
    )
}

export default Type;