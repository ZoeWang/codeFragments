var React = require('react');
var  ReactDOM = require('react-dom');
var Header = require('./header.jsx'); //头部
var From = require('./form.jsx'); //头部
var Jkindex = React.createClass({
	render:function(){
		return (
			<div>
				<Header/>
				<From source="/all"/>			
			</div>
		)
	}
})
ReactDOM.render(
  <Jkindex/>,
  document.getElementById('meeting')
);

