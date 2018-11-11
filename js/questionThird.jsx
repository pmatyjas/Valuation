import React from "react";
import Timer from "./timer.jsx";
import AnswerThirdTeam from './answerThird.jsx'

class QuestionThirdTeam extends React.Component {
    state = {
        counter: 60,
        canSeeQuestion: false
    };
    showQuestion = () => {
        this.setState({
            canSeeQuestion: true
        })
    };

    render() {
        return <div className='each-team'>
            <div className='team-box'>
                <h2 className='team-title'>Druzyna 3</h2>
            </div>

            {this.state.canSeeQuestion ?
                <div className='section-question'>
                    <div className='question-timer-section'>
                        <div className='category-question'>
                            <p className='category'>{this.props.category}</p>
                            <p className='question'>{this.props.ques}</p>
                        </div>
                        <Timer counter={this.state.counter}/>
                    </div>
                    <AnswerThirdTeam counter={this.state.counter} answerThirdTeam={this.props.answerThirdTeam}
                                     updateAnswerThird={this.props.updateAnswerThird}/>

                </div> : <button className='button start-btn' onClick={this.showQuestion}> Start </button>
            }


        </div>
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState({
                counter: this.state.counter - 1
            }, () => {
                if (this.state.counter === 0) {
                    clearInterval(this.intervalId);
                }
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }
}

export default QuestionThirdTeam;