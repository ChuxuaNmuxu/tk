import React, { Component } from 'react';
import {map, pick, isEmpty} from 'lodash'

class Display extends Component {
    parse = {
        qtpye: '题干',
        knowledges: '知识点',
        title: '标题',
        option_a: '选项a',
        option_b: '选项b',
        option_c: '选项c',
        option_d: '选项d',
        option_e: '选项e',
        answer1: '答案1',
        answer2: '答案2',
        parse1: '解析',
    }

    render() {
        const {question = {}} = this.props;
        console.log(7, question)

        const data = pick(question, Object.keys(this.parse))

        if (isEmpty(data)) return <div className='display-wrap display-empty'>点击左侧习题栏</div>

        return (
            <div className='display-wrap'>
                <div className="quesborder">
                    {
                        map(data, (v, k) => {
                            console.log(37, k)
                            return (
                                <div className = {`display-item ${k}`} key={k}>
                                    <div className='dispaly-title'>{this.parse[k]}: </div>
                                    <div className='display-content'>
                                        <div className='.JYE_MATH_SELECTOR'>
                                            <div dangerouslySetInnerHTML={{__html: v}} />
                                        </div>
                                    </div>  
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

Display.propTypes = {

};

export default Display;