import React from "react";

class AnswerFirstTeam extends React.Component {
    state = {
        answer: ''
    };
    handleAnswerChange = (event) => {
        this.setState({answer: event.target.value});
    };
    handleSubmit = (event) => {
        event.preventDefault();
        if (typeof this.props.updateAnswerFirst === 'function') {
            this.props.updateAnswerFirst(this.state.answer)
        }
    };

    render() {
        return <div className='section-answer'>
            <form onSubmit={this.handleSubmit} className='form-answer'>
                <label>
                    <p className='answer-label'>Wasza odpowiedz</p>
                    <input type="number" className='answer'
                           value={this.state.answer}
                           onChange={this.handleAnswerChange} disabled={this.props.counter === 0 ? true : false}
                    />
                </label>
                <input type="submit" className='submit-answer' value="Zatwierdz odpowiedz"
                       disabled={this.props.counter === 0 ? true : false}/>
            </form>
        </div>
    }
}

export default AnswerFirstTeam;