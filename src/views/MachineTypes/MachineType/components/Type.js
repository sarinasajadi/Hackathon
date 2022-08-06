import React, { useEffect, useState } from 'react';
import { Col, Card, Input, InputNumber, DatePicker } from 'antd'

const Type = ({ fields, maintitle, id, value = null, removeType = undefined }) => {
    const [typeObj, setTypeObj] = useState({});
    const [inputList, setInputList] = useState([]);

    const onChange = (e) => {
        setTypeObj({...typeObj, [e.currentTarget.name]: e.currentTarget.value})
    };

    useEffect(() => {
        if (value) {
            setTypeObj(value);
        }
    }, [value])

    useEffect(() => {
        const inputs = [];
        fields?.map((field, index) => {
            setTypeObj((prevState => ({
                ...prevState,
                [field.value]: ''})
            ))
            switch (field.type) {
                case 'Small text':
                    inputs.push(
                        <label key={index}>{field.value}</label>,
                        <Input name={field.value} key={`inpu${index}`} value={typeObj[field.value]} onChange={onChange} />
                    )
                    break
                case 'Number':
                    inputs.push(
                        <label key={index}>{field.value}</label>,
                        <InputNumber name={field.value} key={`inpu${index}`} value={typeObj[field.value]} onChange={onChange} style={{ width: '100%' }} />
                    )
                    break
                case 'Date':
                    inputs.push(
                        <label key={index}>{field.value}</label>,
                        <DatePicker name={field.value} key={`inpu${index}`} value={typeObj[field.value]} onChange={onChange} style={{ width: '100%' }} />
                    )
                    break                    
                default:
                    break;
            }
            
        })
        setInputList(inputs)

    }, [fields])

    useEffect(() => {
        localStorage.setItem(`${maintitle}${id}`, JSON.stringify(typeObj))
    }, [typeObj]);

    return (
        <Col className="gutter-row" span={4} key={fields[0]?.name}>
            <Card size="small"  title={maintitle} style={{ width: '100%' }} >
                {inputList}
            </Card>
        </Col>
    )
}

export default Type;