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
  `;
};

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
    return '';
  }
}