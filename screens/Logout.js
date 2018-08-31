import React,{Component} from 'react';

class Logout extends Component {
    constructor(props) {
        super(props);
     }

    componentWillMount() {
        
        this.props.navigation.navigate('Login')
    }
    render(){
        return(
            
        );
    }
}
export default Logout;