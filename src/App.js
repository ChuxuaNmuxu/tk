import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {message} from 'antd'
import Filters from './Filter'
import List from './List'
import Display from './Display'
import api from './api/api';
import './App.css'

class App extends Component {
    state = {
        questions: [],
        question: {},
        info: {
            grade: [],
            subject: []
        },
        gradeId: null,
        subjectId: null,
        page: 0
    }

    async componentDidMount () {
        const [gradeRes, subjectRes] =  await Promise.all([
          api.get(api.pathResolve('grades')),
          api.get(api.pathResolve('subjects')),
          this.getQuestions({})
        ]);

        console.log(28, gradeRes)

        this.setState({
            info: {
              grade: gradeRes.data,
              subject: subjectRes.data,
            }
        })
    }

    getQuestions = async ({gradeId, subjectId, pass, page, reason}) => {
        gradeId = gradeId || this.state.gradeId;
        subjectId = subjectId || this.state.subjectId;
        pass = pass || this.state.pass;
        page = page || this.state.page;
        reason = reason || this.state.reason;

        const param = {};
        gradeId && (param.gradeId = gradeId);
        subjectId && (param.subjectId = subjectId);
        pass && (param.pass = pass);
        page && (param.offset = (page - 1) * 10);
        reason && (param.reason = reason);

        const questions = await api.get(api.pathResolve(`questions`), param);
        this.setState({
            questions: questions.data ? questions.data : [],
            gradeId,
            subjectId,
            pass,
            total: questions.total ? questions.total : 0
        })
    }

    handleClick = (id) => {
      const {questions} = this.state;

      const question = questions.filter(q => q.id === id);

      this.setState({
          question: question ? question[0] : {}
      })
    }

    handleSelect = async (select) => {
        const state = Object.assign({}, this.state, select);

        const questions = await this.getQuestions(state);
        this.setState(Object.assign({}, state, {questions}))
    }

    handleSelectGrade = async (gradeId) => {
        await this.getQuestions({gradeId});
    }

    handleSelectSubject = async (subjectId) => {
        await this.getQuestions({subjectId});
    }

    handleSelectPass = async (pass) => {
      pass === '3' ? await this.getQuestions({pass: '0', reason: '0'}) : await this.getQuestions({pass});
    }
    
    handlePassQuestion = async (id, pass) => {
        pass = pass ? '1' : '0';
        const res = await api.put(api.pathResolve(`questions/${id}`), {pass})

        if (res.code === 0) {
          await this.getQuestions({})
          message.info('操作成功');
        } else {
          message.error('操作失败')
        }
    }

    handleReason = async (id, reason) => {
      const res = await api.put(api.pathResolve(`questions/${id}`), {reason: reason.join(',')});

      if (res.code === 0) {
        await this.getQuestions({})
        message.info('操作成功');
      } else {
        message.error('操作失败')
      }
    }

    onPagination = async (page) => {
      this.setState({
        page
      })
      const res = await this.getQuestions({page});
    }

    render () {
        return (
            <div className='App'>
                <div className='filters-container'>
                    <Filters
                      data={this.state.info}
                      handleSelectGrade={this.handleSelectGrade}
                      handleSelectSubject={this.handleSelectSubject}
                      handleSelectPass={this.handleSelectPass}
                    />
                </div>
                <div className='display-container'>
                    <List
                      questions={this.state.questions}
                      handleClick={this.handleClick}
                      handlePass={this.handlePassQuestion}
                      handleReason={this.handleReason}
                      total={this.state.total}
                      onPagination={this.onPagination}
                      page={this.state.page}
                    />
                    <Display
                      question={this.state.question}
                    />
                </div>
            </div>
        )
    }
}

export default App;
