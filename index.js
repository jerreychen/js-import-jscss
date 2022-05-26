const importCss = (url, elemId, crossorigin) => {
    return new Promise(resolve => {
        elemId = elemId || ('link_' + Math.random().toString().substring(2, 10));
        let cssElem = document.getElementById(elemId)
        // if there is not an element 
        if(!cssElem) {
            cssElem = document.createElement('link')
            cssElem.id = elemId

            if (crossorigin) {
                cssElem.setAttribute('crossorigin', 'true');
            }
    
            cssElem.type = 'text/css'
            cssElem.rel = 'stylesheet'
            cssElem.href = url;
            document.head.appendChild(cssElem);
        }

        if (cssElem.readyState) {
            //IE
            cssElem.onreadystatechange = function() {
                if (cssElem.readyState !== 'loaded' && cssElem.readyState !== 'complete') {
                return;
                }
        
                cssElem.onreadystatechange = null;
                resolve();
            };
        } else {
            //其他浏览器
            cssElem.onload = function() {
                resolve();
            };
        } 
    })
}

const importScript = (url, elemId, crossorigin) => {
    return new Promise(resolve => {
        elemId = elemId || ('script_' + Math.random().toString().substring(2, 10));
        let jsElem = document.getElementById(elemId)
        // if there is not an element 
        if (!jsElem) {
            jsElem = document.createElement('script');
            jsElem.id = elemId;
    
            if (crossorigin) {
                jsElem.setAttribute('crossorigin', 'true');
            }
    
            jsElem.type = 'text/javascript';
            jsElem.src = url;
            document.head.appendChild(jsElem);
        }
  
      if (jsElem.readyState) {
        //IE
        jsElem.onreadystatechange = function() {
            if (jsElem.readyState !== 'loaded' && jsElem.readyState !== 'complete') {
                return;
            }

            jsElem.onreadystatechange = null;
            resolve();
        };
      } else {
        //其他浏览器
        jsElem.onload = function() {
            resolve();
        };
      }
    })
}

const importCssList = (files) => {
    let promiseList = [];
    files.forEach(file => {
        promiseList.push(importCss(file));
    });

    return Promise.all(promiseList);
}
  
const importScriptList = (files) => {
    let promiseList = [];
    files.forEach(file => {
        promiseList.push(importScript(file));
    });

    return Promise.all(promiseList);
}

module.exports = {
    importCss, importCssList, importScript, importScriptList
}