import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';
import {map} from 'lodash'

class Filters extends Component {
    pass = [
        {
            0: '通过'
        },

    ]

    render() {
        const {data, handleSelectGrade, handleSelectSubject, handleSelectPass}  = this.props;
console.log(16, data)
        return (
            <div className='filters-wrap'>
                <Filter 
                    title={'年级'}
                    // data={data.grade}
                    handleSelect={handleSelectGrade}
                >
                    {
                        Option => map(data.grade, ({gradeName, gradeId}) => <Option value={gradeId} key={gradeId}>{gradeName}</Option>)
                    }
                </Filter>
                <Filter 
                    title={'学科'}
                    handleSelect={handleSelectSubject}
                >
                 {
                        Option => map(data.subject, ({subjectId, subjectName}) => <Option value={subjectId} key={subjectId}>{subjectName}</Option>)
                    }
                </Filter>
                <Filter 
                    title={'通过'}
                    handleSelect={handleSelectPass}
                >
                    {
                        Option => (
                             [
                                <Option value={'0'} key={3938}>未通过</Option>,
                                <Option value={'1'} key={5847}>已通过</Option>
                            ]
                        )
                    }
                </Filter>
            </div>
        );
    }
}

Filters.propTypes = {

};

export default Filters;