import React, { Component } from 'react';
import { Table, Switch, Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

class QuestionList extends Component {
    state = {
        selectId: null,
        page: 1
    }

    columns = [{
        title: 'id',
        dataIndex: 'id',
        key: 'id'
        },
        {
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
                return <div style={{
                    pointerEvents: record.id === this.state.selectId ? 'auto' : 'none'
                }}>
                    <CheckboxGroup options={reason} value={record.reason.split(',')} onChange={(list) => this.handleReason(record.id, list)} />
                </div>
            }
        }
    ];

    handlePass = (id, pass) => {
        const {handlePass} = this.props;
        handlePass && handlePass(id, pass);
    }

    handleClick = (record) => {
        const {handleClick} = this.props;

        this.setState({
            selectId: record.id
        })

        handleClick && handleClick(record.id)
    }

    handleReason = (id, list) => {
        const {handleReason} = this.props;

        console.log(44, list)

        handleReason && handleReason(id, list);
    }

    onPagination = (page) => {
        const {onPagination} = this.props;

        onPagination && onPagination(page);
    }

    render() {
        const data = this.props.questions;
        const {selectId} = this.state;
        const {page} = this.props;

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
                    rowClassName={(record) => record.id === selectId ? 'select' : ''}
                    columns={this.columns} 
                    dataSource={data}
                    pagination={{
                        onChange: this.onPagination,
                        total: this.props.total,
                        current: page
                    }}
                />
            </div>
        );
    }
}

export default QuestionList;