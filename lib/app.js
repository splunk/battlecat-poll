import React from 'react';
import ReactDOM from 'react-dom';

import SetupView from 'views/setup';
import QuestionView from 'views/question';
import Logo from 'views/logo';

import LocalStorage from 'localstorage';
import {parseQueryString} from 'querystring';
import {int, guid} from 'utils';
import SplunkHttp from 'splunkhttp';

import $ from 'jquery';
import FastClick from 'fastclick';

import 'normalize.css';
import styles from './app.css';

let splunkHttpEndpoint = new SplunkHttp({
    host: SPLUNK_HOST,
    port: SPLUNK_PORT,
    ssl: SPLUNK_SSL,
    token: SPLUNK_TOKEN
});

$(() => FastClick.attach(document.body));

let PollApp = React.createClass({

    getInitialState() {
        var qs = parseQueryString(window.location.search) || {};
        var initialState = {
            setupComplete: false,
            uuid: LocalStorage.get('uuid') || guid(),
            name: LocalStorage.get('name'),
            subject: qs.subject || 'Untitled Poll',
            questionCount: int(qs.count, 99)
        };
        LocalStorage.set('uuid', initialState.uuid);
        splunkHttpEndpoint.send({
            uuid: initialState.uuid,
            ua: navigator.userAgent,
            subject: initialState.subject,
            name: initialState.name,
            setup: false
        });
        return initialState;
    },

    updateState(newState) {
        this.setState(newState);
    },

    onNameUpdate(data) {
        this.updateState({
            ...this.state,
            name: data.value
        });
        LocalStorage.set('name', data.value);
    },

    finishSetup() {
        this.updateState({
            ...this.state,
            setupComplete: true,
            question: 1,
            answers: []
        });
        
        splunkHttpEndpoint.send({
            uuid: this.state.uuid,
            ua: navigator.userAgent,
            subject: this.state.subject,
            name: this.state.name,
            setup: true
        });
    },

    getAnswerData(question) {
        return this.state.answers[question - 1] || {};
    },

    setAnswerData(question, data) {
        let newState = {...this.state};
        let answerData = this.state.answers;
        answerData[question - 1] = data;
        newState.answers = answerData;
        this.updateState(newState);
    },

    onAnswerSelected: function(answer) {
        let answerData = this.getAnswerData(this.state.question);
        var updatedAnswerData = {
            ...answerData,
            [answer]: !answerData[answer]
        };
        this.setAnswerData(this.state.question, updatedAnswerData);
        
        splunkHttpEndpoint.send({
            uuid: this.state.uuid,
            ua: navigator.userAgent,
            subject: this.state.subject,
            name: this.state.name,
            question: this.state.question,
            A: updatedAnswerData.A ? 1 : 0,
            B: updatedAnswerData.B ? 1 : 0,
            C: updatedAnswerData.C ? 1 : 0,
            D: updatedAnswerData.D ? 1 : 0
        });
    },

    onNextQuestion() {
        this.updateState({
            ...this.state,
            question: Math.min(this.state.question + 1, this.state.questionCount)
        });
    },

    onPrevQuestion() {
        let newState = {...this.state};
        newState.question = Math.max(1, newState.question - 1);
        this.updateState(newState);
    },

    renderActiveMode() {
        if (this.state.setupComplete) {
            return <QuestionView question={this.state.question}
                                 questionCount={this.state.questionCount}
                                 selected={this.getAnswerData(this.state.question)}
                                 onAnswerSelected={this.onAnswerSelected}
                                 onNextQuestion={this.onNextQuestion}
                                 onPrevQuestion={this.onPrevQuestion}
                                 subject={this.state.subject}/>
        } else {
            return <SetupView onNextClick={this.finishSetup}
                              onNameUpdate={this.onNameUpdate}
                              value={this.state.name}
                              subject={this.state.subject}/>
        }
    },

    render() {
        return <div className={styles.app}>
            {this.renderActiveMode()}
            <footer className={styles.footer}>
                <Logo />
            </footer>
        </div>
    }
});

window.PollApp = <PollApp />;

const ct = document.createElement('div');
ct.className = styles.container;
document.body.appendChild(ct);
ReactDOM.render(window.PollApp, ct);