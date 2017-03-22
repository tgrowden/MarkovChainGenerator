import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Form from './src/Form'
import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
injectTapEventPlugin()

const styles = {
    container: {
        'padding': '3rem'
    }
}

const App = () => (
    <MuiThemeProvider>
        <div class="container" style={styles.container}>
            <Form></Form>
        </div>
  </MuiThemeProvider>
)

ReactDOM.render(
    <App />,
    document.getElementById('app')
)
