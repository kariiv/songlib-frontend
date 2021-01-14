import React from 'react';

export default class SheetHistory extends React.Component {

    static HISTORY_TIMEOUT = 5000;

    constructor(props) {
        super(props);
        const {player, data} = this.props
        if (!player || !data) throw Error("Missing props")
        this.historyTimeout = null;
    }

    componentDidMount() {
        this.makeHistoryTimeout()
    }

    componentWillUnmount() {
        clearTimeout(this.historyTimeout);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data.s !== this.props.data.s) this.makeHistoryTimeout();
    }

    makeHistoryTimeout = () => {
        clearTimeout(this.historyTimeout);
        this.historyTimeout = setTimeout(this.handleHistory, SheetHistory.HISTORY_TIMEOUT);
    }

    handleHistory = () => {
        this.props.player.toHistory(this.props.data.s.id)
    }

    render() {
        return null
    }
}