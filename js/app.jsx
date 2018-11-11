import React from 'react';
import ReactDOM from 'react-dom';
import './../scss/style.scss';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';

import Header from './header.jsx';
import QuestionFirstTeam from './questionFirst.jsx';
import QuestionSecondTeam from './questionSecond.jsx';
import QuestionThirdTeam from './questionThird.jsx';


class Questions extends React.Component {
    state = {
        answerFirstTeam: '',
        answerSecondTeam: '',
        answerThirdTeam: '',
        questions: [],
        showQuestion: false,
        team: 1,
        randomNumber: 0,
        questionWhichWas: []
    };

    // questions and checking if id is different
    loterryQuestion = () => {
        let number = Math.floor(Math.random() * (15 - 1 + 1)) + 1;
        while (this.state.questions.length > this.state.questionWhichWas.length && this.state.questionWhichWas.indexOf(number) > -1) {
            number = Math.floor(Math.random() * (15 - 1 + 1)) + 1;
        }
        return number
    };

    updateAnswerFirst = (answerFirst) => {
        this.setState({
            answerFirstTeam: answerFirst,
        })
    };

    updateAnswerSecond = (answerSecond) => {
        this.setState({
            answerSecondTeam: answerSecond,
        })
    };

    updateAnswerThird = (answerThird) => {
        this.setState({
            answerThirdTeam: answerThird,
        })
    };

    //aktualizacja pytania
    findQuestion = () => {
        this.setState({
            showQuestion: true,
            randomNumber: this.loterryQuestion()
        });
    };
    nextTeam = () => {
        this.setState({
            team: this.state.team + 1
        });
    };
    playMore = () => {
        this.setState({
            team: 1,
            randomNumber: this.loterryQuestion()
        })
    };

    render() {
        return <div className='question-container'>

            {this.state.showQuestion ? this.state.questions.map(item => {
                if (item.id === this.state.randomNumber) {

                    if (this.state.team === 1) {
                        return <div className='team-render-container' key={item.id}>

                            <QuestionFirstTeam answerFirstTeam={this.state.answerFirstTeam}
                                               updateAnswerFirst={this.updateAnswerFirst} item={item.id}
                                               ques={item.ques}
                                               category={item.category}/>
                            <div className='next-section'>
                                <button className='button next-button' onClick={this.nextTeam}>NEXT TEAM</button>
                            </div>
                        </div>
                    } else if (this.state.team === 2) {
                        return <div className='team-render-container' key={item.id}>
                            <QuestionSecondTeam answerSecondTeam={this.state.answerSecondTeam}
                                                updateAnswerSecond={this.updateAnswerSecond} item={item.id}
                                                ques={item.ques}
                                                category={item.category}/>
                            <div className='next-section'>
                                <button className='button next-button' onClick={this.nextTeam}>NEXT TEAM</button>
                            </div>
                        </div>
                    } else if (this.state.team === 3) {
                        return <div className='team-render-container' key={item.id}>
                            <QuestionThirdTeam answerThirdTeam={this.state.answerThirdTeam}
                                               updateAnswerThird={this.updateAnswerThird} item={item.id}
                                               ques={item.ques}
                                               category={item.category}/>
                            <div className='next-section'>
                                <button className='button next-button' onClick={this.nextTeam}>WYNIKI</button>
                            </div>
                        </div>
                    } else if (this.state.team === 4) {

                        let resultOne = 0;
                        let resultSecond = 0;
                        let resultThird = 0;

                        if (this.state.answerFirstTeam > item.correctAnswer) {
                            resultOne = this.state.answerFirstTeam - item.correctAnswer;
                            console.log(resultOne)
                        } else if (item.correctAnswer > this.state.answerFirstTeam) {
                            resultOne = item.correctAnswer - this.state.answerFirstTeam;
                            console.log(resultOne)
                        }

                        if (this.state.answerSecondTeam > item.correctAnswer) {
                            resultSecond = this.state.answerSecondTeam - item.correctAnswer;
                            console.log(resultSecond)
                        } else if (item.correctAnswer > this.state.answerSecondTeam) {
                            resultSecond = item.correctAnswer - this.state.answerSecondTeam;
                            console.log(resultSecond)
                        }

                        if (this.state.answerThirdTeam > item.correctAnswer) {
                            resultThird = this.state.answerThirdTeam - item.correctAnswer;
                            console.log(resultThird)
                        } else if (item.correctAnswer > this.state.answerThirdTeam) {
                            resultThird = item.correctAnswer - this.state.answerThirdTeam;
                            console.log(resultThird)
                        }

                        if (resultOne < resultSecond && resultOne < resultThird) {
                            console.log('najblizej byla druzyna 1')
                        } else if (resultSecond < resultOne && resultSecond < resultThird) {
                            console.log('najblizej byla druzyna 2')
                        } else if (resultThird < resultOne && resultThird < resultSecond) {
                            console.log('najblizej byla druzyna 3')
                        }

                        return <div key={item.id}>
                            <div className='results'>
                            <h1>TABLICA WYNIKOW</h1>
                            <p>Druzyna 1: {this.state.answerFirstTeam} </p>
                            <p>Druzyna 2 : {this.state.answerSecondTeam} </p>
                            <p>Druzyna 3: {this.state.answerThirdTeam} </p>
                            <p>Poprawna odpowiedz: {item.correctAnswer} </p>
                            <p>Opis: {item.description} </p>
                            </div>

                            <div className='next-section'>
                                <button className='button next-button' onClick={this.playMore}>Graj Dalej</button>
                            </div>
                        </div>
                    }
                }
            }) : <button onClick={this.findQuestion} className='button lotto'> Losuj pytanie </button>
            }
        </div>
    }

    componentDidMount() {
        fetch("http://localhost:3000/questions")
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                }
                throw new Error('Blad sieci!');
            })
            .then(data => {
                this.setState({
                    questions: data,
                })
            })
            .catch(err => console.log(err));
    }
}


class App extends React.Component {

    render() {
        return (
            <HashRouter>
                <div className='app'>
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={Questions}/>
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});

