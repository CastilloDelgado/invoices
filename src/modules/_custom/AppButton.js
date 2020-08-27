import React, { Component } from 'react'; 
import { Button } from 'semantic-ui-react';

class AppButton extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const {backgroundColor, children} = this.props;
        return (
            <Button {...this.props} style={{'backgroundColor' : backgroundColor}} >
                {children}
            </Button>
        );
    }
}

export default AppButton;
