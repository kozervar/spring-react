var __APPLICATION__ = {};

var __NASHORN__RENDER__ = function(params){
    var data = params ? params : {};
    var React = __APPLICATION__.React;
    var ReactDOM = __APPLICATION__.ReactDOM;
    var ReactDOMServer = __APPLICATION__.ReactDOMServer;
    var Application = __APPLICATION__.Application;
    return ReactDOMServer.renderToString(
        React.createElement(Application, {data: data})
    );
};