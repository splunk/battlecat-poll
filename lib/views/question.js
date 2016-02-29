import React, {Component} from 'react';

import styles from './question.css';

let AnswerView = props => <div
    className={styles.answer + " " + props.className + ' ' + (props.selected ? styles.answerSelected : '')}
    onClick={props.onClick}>
    <div className={styles.label}>{props.label}</div>
</div>;

export default class QuestionView extends Component {

    selectAnswer(answer) {
        return () => this.props.onAnswerSelected(answer);
    }

    nextQuestion() {
        return () => this.props.onNextQuestion();
    }

    prevQuestion() {
        return !this.isPrevDisabled() ? () => this.props.onPrevQuestion() : null;
    }

    isNextDisabled() {
        return !this.props.questionCount || this.props.question >= this.props.questionCount;
    }

    isPrevDisabled() {
        return this.props.question < 2;
    }

    renderControls() {
        let controlStyles = [styles.control];
        let prevStyles = controlStyles.slice();
        if (this.isPrevDisabled()) {
            prevStyles.push(styles.controlDisabled);
        }
        let nextStyles = controlStyles.slice();
        if (this.isNextDisabled()) {
            nextStyles.push(styles.controlDisabled);
        }
        return <div className={styles.controls}>
            <div className={prevStyles.join(' ')} onClick={this.prevQuestion()}>
                <div className={styles.icon}>&#x2039;</div>
            </div>
            <div className={styles.num}>
                <div className={styles.qNumber}>{this.props.question}</div>
                <div className={styles.qLabel}>Question</div>
            </div>
            <div className={nextStyles.join(' ')} onClick={this.nextQuestion()}>
                <div className={styles.icon}>&#x203A;</div>
            </div>
        </div>;
    }

    isAnswerSelected(answer) {
        return !!this.props.selected[answer];
    }

    render() {
        return <div className={styles.container}>
            <div className={styles.header}>
                <h4>{this.props.subject}</h4>
            </div>
            <div className={styles.answers}>
                <AnswerView className={styles.A} label="A" selected={this.isAnswerSelected('A')}
                            onClick={this.selectAnswer('A')}/>
                <AnswerView className={styles.B} label="B" selected={this.isAnswerSelected('B')}
                            onClick={this.selectAnswer('B')}/>
                <AnswerView className={styles.C} label="C" selected={this.isAnswerSelected('C')}
                            onClick={this.selectAnswer('C')}/>
                <AnswerView className={styles.D} label="D" selected={this.isAnswerSelected('D')}
                            onClick={this.selectAnswer('D')}/>
            </div>
            {this.renderControls()}
        </div>
    }
}