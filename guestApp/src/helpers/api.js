import { Platform } from 'react-native';
import { WAIT_FOR_ACTION, ERROR_ACTION } from 'redux-wait-for-action-rn';
import store from '../store';
import { authActions } from "../actions";

import I18n from "../strings/I18n";
import { AgencyID, COMPANY_ID } from '../theme';
import { Base64 } from "./index";
import { API_CLIENT, API_SECRET, rootVisitSunUrl, rootVisitSunUrlRefreshToken, rootDestinationUrl } from "../config";

export const ApiClient = {
    login: async (username, password, deviceToken, deviceID) => {
    	try {
    		if (!username || !password) {
    			throw I18n.t("LoginStrings.loginAlertUsernamePasswRequired");
            }

            let url = `${ rootVisitSunUrl }/api/token`;
            let requestBody = {
                "bookingNo": username,
                "password": password,
                "device_token": deviceToken,
                "device_id": deviceID,
                "device_type": Platform.OS,
                "agency_id": AgencyID,
            }
            let headerBody = { 
                'CompanyID': COMPANY_ID,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
			let result = await fetch(url, {
				method: 'POST',
                headers: headerBody,
                body:JSON.stringify(requestBody)
			});

            let { access_token, refresh_token, booking_hash, agency_id, company_id, resort_id, error, message, status } = await result.json();

            if (error) {
				if (error === 'invalid_grant') {
                    throw I18n.t("LoginStrings.loginAlertUnknownUsernamePasw");
				}

				throw error;
			}

			return { refresh_token, access_token, booking_hash, agency_id, company_id, resort_id, message, status }
		} catch(error) {
    		throw error.message
		}
	},

    logout: async (url) => {
        try {
            let result = await ApiClient.del(url);

            if (result.status.toLowerCase() === 'success') {
				return { success: true };
			}

            else return { success: false }
        } catch (error) {
            throw error.message;
        }
    },

	refresh_token: async (token) => {
        try {
            if (!token) {
                throw I18n.t("LoginStrings.loginAlertNotLoggedIn");
            }

            let url = `${ rootVisitSunUrlRefreshToken }/api/token`;
            let result = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept'		: 'application/json',
                    'Authorization'	: 'Basic ' + Base64.btoa(`${API_CLIENT}:${API_SECRET}`),
                    'Content-Type'	: 'text'
                },
                body: `grant_type=refresh_token&refresh_token=${token}`
            });

            let { access_token, refresh_token, error } = await result.json();

            if (error) {
                if (error === 'invalid_grant') {
                    throw I18n.t("LoginStrings.loginAlertInvalidRefreshToken");
                }

                throw error;
            }

            return { refresh_token, access_token };
        } catch(error) {
            if (error === "Invalid refresh token!") {
                throw "invalid_refresh_token";
            }

        	if (error === undefined) {
        		throw I18n.t("LoginStrings.loginAlertCanNotUpdate");
			} if (typeof error === 'string') {
        		throw error;
			} else {
				throw error.message;
			}
        }
    },

    get: (url, params = {}, headers = {}, hasBookingHushInUrl = false) => {
        return ApiClient.makeRequest(url, 'GET', {}, headers, hasBookingHushInUrl);
    },

    post:(url, params = {}, headers = {}, hasBookingHushInUrl = false) => {
        return ApiClient.makeRequest(url, 'POST', params, headers, hasBookingHushInUrl);
    },

    put: (url, params = {}, headers = {}, hasBookingHushInUrl = false) => {
        return ApiClient.makeRequest(url, 'PUT', params, headers, hasBookingHushInUrl);
    },

    del: (url, params = {}, headers = {}, hasBookingHushInUrl = false) => {
        return ApiClient.makeRequest(url, 'DELETE', params, headers, hasBookingHushInUrl);
    },

    // private generic method.
    makeRequest: async (url, type, params = {}, headers = {}, hasBookingHushInUrl = false, first_request = true) => {
        try {
            type = type.toUpperCase();

            let { auth } = store.getState();
            let request  = {
                method: type,
                headers: {
                    'Authorization'	: `Bearer ${auth.access_token}`,
                    'Accept'		: 'application/json',
                    'Content-Type'	: 'application/json',
					'X-Booking'		: auth.booking_hash,
					'CompanyID'		: auth.company_id,
					'AgencyID'		: auth.agency_id,
                    ...headers
                }
            };

            if (type === 'POST' || type === 'PUT') {
                request.body = JSON.stringify(params)
            }

            if (hasBookingHushInUrl) {
            	url = url + auth.booking_hash;
			}

            let result = await fetch(url, request);

            if (result.status === 401 && first_request) {
                return store.dispatch({
                    type				: authActions.TYPES.REFRESH_TOKEN_REQUEST,
                    [WAIT_FOR_ACTION]	: authActions.TYPES.REFRESH_TOKEN_SUCCESS,
                    [ERROR_ACTION]		: authActions.TYPES.REFRESH_TOKEN_FAIL
                }).then(() => {
                    return ApiClient.makeRequest(url, type, params, headers, hasBookingHushInUrl, false);
                }).catch(error => {
                    throw error.message;
                });
            }

            return await result.json();
        } catch (error) {
            throw error.message;
        }
    },

    getDestinations: async () => {
        try {
            let url = `${ rootDestinationUrl }/api/resorts`;
            let { auth } = store.getState();
            let result = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-Agency': AgencyID,
                    'Authorization': `Bearer ${ auth.access_token }`
                }
            });

            let resorts = await result.json();
            return resorts;
        } catch (error) {
            throw error.message
        }
    },

    getWeeks: async () => {
        try {
            let url = `${ rootVisitSunUrl }/api/weeks`;
            let { auth } = store.getState();
            let result = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-Agency': AgencyID,
                    'Authorization': `Bearer ${ auth.access_token }`
                }
            });
            let weeks = await result.json();
            return weeks.weeks;
        } catch (error) {
            throw error.message
        }
    },

    checkUpdate: async () => {
        try {
            let url = `${ rootVisitSunUrl }/api/version`;
            let result = await fetch(url, {
                method: 'GET',
                headers: {
                    'AgencyID': AgencyID
                }
            });

            let { version,  androidVersion, iosVersion, message, status } = await result.json();
            return { version, androidVersion, iosVersion, message, status };
        } catch (error) {
            throw error.message
        }
    },

    loginAsGuest: async (destinationId, weekStart, weekEnd) => {
        try {
            let url = `${ rootVisitSunUrl }/api/token/guest`;
            let requestBody = {
                "agencyID": AgencyID,
                "resortID": destinationId,
                "weekStartDate": weekStart,
                "weekEndDate": weekEnd
            }
            let result = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
             
            let { access_token, refresh_token, booking_hash, error, message, status } = await result.json();

            if (error) {
                if (error === 'invalid_grant') {
                    throw I18n.t("LoginStrings.loginAlertUnknownUsernamePasw");
                }

                throw error;
            }

            return { access_token, refresh_token, booking_hash, error, message, status }
        } catch(error) {
            throw error.message
        }
    },

    doRehash: async (destinationId) => {
        try {
            let { auth } = store.getState();
            let url = `${ rootVisitSunUrl }/api/token/${ destinationId }/guide/rehash?agencyID=${ AgencyID }`;
            let result = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization'	: `Bearer ${ auth.access_token }`
                }
            });

            let { booking_hash, error, message, status } = await result.json();
            return {  booking_hash, error, message, status }
        } catch(error) {
            throw error.message
        }
    }
};
