import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
const Option = Select.Option;

class Filter extends Component {
    handleChange = (v) => {
        const { handleSelect} = this.props;
        handleSelect && handleSelect(v);
    }

    render() {
        const {data, title} = this.props;

        return (
            <div className='filter-wrap'>
                <div className='title'>
                    {title}
                </div>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={this.handleChange}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                {
                    this.props.children(Option)
                }
            </Select>
            </div>
        );
    }
}

Filter.propTypes = {

};

export default Filter;