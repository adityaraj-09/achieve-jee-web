
// apiCache.js
const apiCache = {};


export const getCachedData = (url) => {
  if (apiCache[url] && Date.now() - apiCache[url].timestamp < 60000) {
    
    return apiCache[url].data;
  } else {
    return null;
  }
};

export const cacheData = (url, data) => {
  apiCache[url] = {
    data,
    timestamp: Date.now(),
  };
};

export const getPid=()=>{
  if(apiCache["pid"]){
    return apiCache["pid"].pid
  }
  
}

export const pidData=(pid)=>{
  apiCache["pid"]={pid}
}