import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import MarkovChain from '../../src/MarkovChain'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {TheDonald} from '../../seeds'

const styles = {
    textField: {
        'margin-top': '2rem',
        'margin-bottom': '2rem'
    },
}
export default class Form extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            seed: '',
            chain: '',
            open: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.generateChain = this.generateChain.bind(this)
        this.handleRequestClose = this.handleRequestClose.bind(this)
        this.clearSeed = this.clearSeed.bind(this)
        this.useTheDonald = this.useTheDonald.bind(this)
    }

    handleChange(e) {
        this.setState({
            seed: e.target.value
        })
    }

    generateChain() {
        if (this.state.seed) {
            const markovChain = new MarkovChain(this.state.seed)
            this.setState({
                chain: markovChain.generate(),
                open: true
            })
        }
    }

    useTheDonald() {
        this.setState({
            seed: TheDonald
        }, () => {
            this.generateChain()
        })
    }

    handleRequestClose() {
        this.setState({
            open: false
        })
    }

    clearSeed() {
        this.setState({
            seed: ''
        })
    }

    render() {
        const standardActions = (
            <div>
                <FlatButton
                    label="Close"
                    onTouchTap={this.handleRequestClose}
                    secondary={true}
                />
                <FlatButton
                    label="Another!"
                    primary={true}
                    onTouchTap={this.generateChain}
                />
            </div>
        )
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    title="Generated Markov Chain"
                    actions={standardActions}
                    onRequestClose={this.handleRequestClose}
                >
                    {this.state.chain}
                </Dialog>
                <FlatButton
                    label="Use example seed"
                    primary={true}
                    onClick={this.useTheDonald}
                />
                <TextField
                    value={this.state.seed}
                    onChange={this.handleChange}
                    hintText='Seed Text'
                    fullWidth={true}
                    multiLine={true}
                    style={styles.textField}
                />
                <RaisedButton
                    label="Clear"
                    onClick={this.clearSeed}
                    secondary={true}
                />
                <RaisedButton
                    label="Generate!"
                    onClick={this.generateChain}
                    disabled={!this.state.seed}
                    primary={true}
                />
            </div>
        )
    }
}
