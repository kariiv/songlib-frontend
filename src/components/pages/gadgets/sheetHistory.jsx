import React from 'react';

export default class SheetHistory extends React.Component {

    static HISTORY_TIMEOUT = 60000;

    constructor({player, data}) {
        super({player, data});
        if (!player || data) throw Error("Missing props")
    }

    componentDidMount = this.makeHistoryTimeout;
    componentWillUnmount() {
        clearTimeout(this.historyTimeout);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data.s !== this.props.data.s) this.makeHistoryTimeout();
    }

    makeHistoryTimeout() {
        clearTimeout(this.historyTimeout);
        this.historyTimeout = setTimeout(this.handleHistory, SheetHistory.HISTORY_TIMEOUT);
    }

    handleHistory() {
        this.props.player.toHistory(this.props.data.s.id)
    }
}