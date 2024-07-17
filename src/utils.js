export const generateScript = () => {
  return `
    window.cti_api = function (action, data) {
      if (window.ChativeApi) {
        window.ChativeApi(action, data);
      }
    
      window.ChativeEvents ||= [];
      window.ChativeEvents.push([action, data]);
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
    window.cti_api('${event}', ${JSON.stringify(data)});
  `;
};

export const safeParse = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return {};
  }
};
