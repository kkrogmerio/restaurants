import NetInfo from "@react-native-community/netinfo";

class Connectable {
    _isConnected = false;
    _callbacks = [];

	startConnectionListener = () => {
		NetInfo.addEventListener(this.handleConnectionChange);
	};

	stopConnectionListener = () => {
		NetInfo.removeEventListener(this.handleConnectionChange);
    };

    subscribeForNetworkChanges = (callback) => {
        this._callbacks.push(callback);
    };

	isConnected = () => {
        return this._isConnected;
    };

	handleConnectionChange = (state) => {
        this._isConnected = state.isConnected;

        if (this._callbacks && this._callbacks.length > 0) {
            this._callbacks.forEach(callback => callback ? callback(this._isConnected) : null);
        }
    };
}

export default new Connectable();