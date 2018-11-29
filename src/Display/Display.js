import React, { Component } from 'react';

class Display extends Component {
    render() {
        const {question} = this.props;
        console.log(7, question)
        const {
            title,
            answer1,
            answer2,
            parse,
        } = question[0] || {};
        return (
            <div className='display-wrap'>
                <div className="quesborder">
                    <div className='dispaly-title'>题干: </div>
                    <div className='display-content'>
                        <div className='.JYE_MATH_SELECTOR'>
                            <div dangerouslySetInnerHTML={{__html: title}} />
                        </div>
                    </div>
                    <div className='dispaly-title'>答案一: </div>
                    <div className='display-content'>
                        <div className="JYE_MATH_SELECTOR">
                            <div dangerouslySetInnerHTML={{__html: answer1}} />

                        </div>
                    </div>
                    <div className='dispaly-title'>答案二: </div>
                    <div className='display-content'>
                        <div className="JYE_MATH_SELECTOR">
                            <div dangerouslySetInnerHTML={{__html: answer2}} />

                        </div>
                    </div>
                    <div className='dispaly-title'>解析: </div>
                    <div className='display-content'>
                        <div className="JYE_MATH_SELECTOR">
                            <div dangerouslySetInnerHTML={{__html: parse}} />

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Display.propTypes = {

};

export default Display;