var React = require('react');
var $ = require('jquery');
var Form = React.createClass({
	getInitialState: function() {
    	return {data:[]}
  	},
	componentDidMount:function(){
		$.get(this.props.source,function(result){
			console.log(result)
			var alldata;
			if(result.code == 200){
				alldata = result.data;
				this.setState({
					data:alldata
				});
			}
			
		}.bind(this));
	},
	render:function(){
		console.log("222")
		var list = this.state.data;
		 console.log(list)
		var listone = list.map(function(data){
			console.log(data)
			var id = data.id;
			var name = data.name;
			var age = data.age;
			var time = data.time;

			return (
				
					<li>
						<span>{id}</span>
						<span>{name}</span>
						<span>{age}</span>
						<span>{time}</span>
					</li>
				
			);
		});

		return(
			<div><ul class="jk-from">{listone}</ul></div>
		)

	}
})
module.exports=Form;