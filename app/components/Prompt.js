var React = require('react');
var PropTypes = React.PropTypes;
var transparentBg = require('../styles').transparentBg;

// can use stateless functional component if the component is not
// managing state, routing, etc
function Prompt (props) {
	return (
		<div className="jumbrotron col-sm-6 col-sm-offset-3 text-center" style={transparentBg}>
			<h1>{props.header}</h1>
			<div className="col-sm-12">
				<form onSubmit={props.onSubmitUser}>
					<div className="form-group">
						<input
							className="form-control"
							placeholder="Github username"
							type="text" 
							onChange={props.onUpdateUser}
							value={props.username} />
					</div>
					<div className="form-group col-sm-4 col-sm-offset-4">
						<button
							className="btn btn-block btn-success"
							type="submit">
							Continue
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

// for stateless functional components, move propTypes to 
// an property of the function
Prompt.propTypes = {
	header: PropTypes.string.isRequired,
	onUpdateUser: PropTypes.func.isRequired,
	onSubmitUser: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired
};

module.exports = Prompt;