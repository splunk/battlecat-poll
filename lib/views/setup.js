import React from 'react';
import {TextInput, Button} from 'belle';

import styles from './setup.css';

let SetupInput = (props) =>
    <div className={styles.input + ' ' + props.className}>
        <label className={styles.label}>{props.label}</label>
        <TextInput id="name-input" className={styles.text} placeholder={props.placeholder}
                   onUpdate={props.onUpdate}
                   value={props.value}/>
    </div>;

export default class SetupView extends React.Component {

    render() {
        return <div className={styles.root}>
            <h2>{this.props.subject}</h2>
            <div className={styles.inputs}>
                <SetupInput className={styles.nameInput} label="Enter your name:" placeholder="Your name"
                            onUpdate={this.props.onNameUpdate} value={this.props.value}/>
                <div className={styles.nextButton}>
                    <Button primary onClick={this.props.onNextClick}>Next</Button>
                </div>
            </div>
        </div>
    }

}