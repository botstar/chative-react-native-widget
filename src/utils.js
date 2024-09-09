import { QUERY_URL, WIDGET_URL } from './constants';
export const generateScript = (user = {}) => {
  const userString = safeStringify(user);
  return `
    window.cti_api = function (action, data) {
      if (window.ChativeApi) {
        window.ChativeApi(action, data);
      }
    
      window.ChativeEvents ||= [];
      window.ChativeEvents.push([action, data]);
    };

    const user = ${userString};

    if (user.user_id) {
      window.cti_api('boot', JSON.parse('${userString}'));
    }

    window.cti_api('openChatWindow');
    window.cti_api('addEventListener', { event: 'closed', callback: () => { 
      window.cti_api('hide'); 
      window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'closed' })); 
    }});

    window.cti_api('addEventListener', { event: 'new-agent-message', callback: () => { 
      window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'new-agent-message' })); 
    }});

    window.cti_api('addEventListener', { event: 'ready', callback: () => { 
      window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'ready' })); 
    }});
  `;
};

export const generateScriptGetError = (channelId) => {
  return `
  function getTimeZone() {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return timeZone;
  }
  (function() {
    fetch("${QUERY_URL}", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "app_id": "${channelId}",
        "user_id": "",
        "locale": "en-US",
        "timezone": getTimeZone(),
        "template": false,
        "host": "${WIDGET_URL}/${channelId}?mode=livechat"
      })
    }).then((response) => {
      if (response.status !== 200) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'error', message: 'missing_config' }));
      }
    }).catch((error) => {
      window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'error', data: error }));
    });
  })();
  `;
}

export const WidgetApi = (event, data) => {
  return `
    window.cti_api('${event}', ${data});
  `;
};

export const safeParse = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return {};
  }
};

export const safeStringify = (data) => {
  try {
    return JSON.stringify(data);
  } catch (e) {
    return '{}';
  }
}