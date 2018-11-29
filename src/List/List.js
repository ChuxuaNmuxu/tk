import React, { Component } from 'react';
import { Table, Switch, Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

class QuestionList extends Component {
    columns = [{
        title: 'id',
        dataIndex: 'id',
        key: 'id'
        },
        {
        title: '题型',
        dataIndex: 'qtpye',
        key: 'qtpye'
        }, {
        title: '知识点',
        dataIndex: 'knowledges',
        key: 'knowledges',
        }, {
        title: '选项a',
        dataIndex: 'option_a',
        key: 'option_a',
        }, {
            title: '选项a',
            dataIndex: 'option_a',
            key: 'option_a',
        }, {
            title: '选项b',
            dataIndex: 'option_b',
            key: 'option_b',
        }, {
        title: '选项c',
        dataIndex: 'option_c',
        key: 'option_c',
        },{
        title: '选项d',
        dataIndex: 'option_d',
        key: 'option_d',
        },  {
            title: '选项e',
            dataIndex: 'option_e',
            key: 'option_e',
        }, {
        title: '通过',
        key: 'pass',
        render: (text, record) => {
            const checked = !record.pass || record.pass === '0' ? false : true;
            return <Switch checked={checked} onChange={(check) => this.handlePass(record.id, check)}>通过</Switch>
        },},
        {
            title: '原因',
            key: 'reason',
            render: (text, record) => {
                const reason = [
                    '题干选项内容缺失、语义不通顺、有错别字',
                    '答案不正确',
                    '解析、题型、学科、知识点未正确对应'
                ];
                return <CheckboxGroup options={reason} value={record.reason.split(',')} onChange={(list) => this.handleReason(record.id, list)} />
            }
        }
    ];

    handlePass = (id, pass) => {
        const {handlePass} = this.props;
        handlePass && handlePass(id, pass);
    }

    handleClick = (record) => {
        const {handleClick} = this.props;

        handleClick && handleClick(record.id)
    }

    handleReason = (id, list) => {
        const {handleReason} = this.props;

        console.log(44, list)

        handleReason && handleReason(id, list);
    }

    onPagination = (page) => {
        const {onPagination} = this.props;

        console.log(11, page)

        onPagination && onPagination(page);
    }

    render() {
        const data = this.props.questions;

        console.log(73, this.props.questions)
        console.log(94, this.props.total)

        // const {data=qdata} = this.props;

        return (
            <div className='list-wrap'>
                <Table 
                    onRow={(record) => {
                        return {
                          onClick: () => this.handleClick(record),       // 点击行
                        };
                      }}
                    columns={this.columns} 
                    dataSource={data}
                    pagination={{
                        onChange: this.onPagination,
                        total: this.props.total
                    }}
                />
            </div>
        );
    }
}

export default QuestionList;