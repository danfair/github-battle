var React = require('react');
var Prompt = require('../components/Prompt');

var PromptContainer = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function() {
		return {
			username: ''
		}
	},

	handleUpdateUser: function(e) {
		this.setState({
			username: e.target.value
		});
	},

	handleSubmitUser: function(e) {
		e.preventDefault();

		// reset the state
		var username = this.state.username;
		this.setState({
			username: ''
		});

		// this.props.routeParams.playerOne defined in routes
		// /playerTwo/:playerOne
		if (this.props.routeParams.playerOne) {
			// go to /battle
			this.context.router.push({
				pathname: '/battle',
				// pass along some data to our new route
				query: {
					playerOne: this.props.routeParams.playerOne,
					playerTwo: this.state.username
				}
			});
		} else {
			// go to /playerTwo
			this.context.router.push('/playerTwo/' + this.state.username);
		}
	},

	render: function() {
		return (
			<Prompt 
				// changed name from onSubmitUser to handleSubmitUser, same for onUpdateUser
				// passed in functions usually are onSubmitUser (eg), function doing
				// the work is handleSubmitUser (eg)
				onSubmitUser={this.handleSubmitUser}
				onUpdateUser={this.handleUpdateUser}
				header={this.props.route.header}
				username={this.state.username}
			/>
		)
	}
});

module.exports = PromptContainer;