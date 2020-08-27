import React, { Component } from 'react'
import { Header,  Modal } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { agentesActions } from '..';

class FacturasModal extends Component {
    componentDidMount(){
        const { data } = this.props;

    }

    render() {
        const { trigger } = this.props;
        return (
            <Modal trigger={trigger}>
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header>Default Profile Image</Header>
                        <p>
                        We've found the following gravatar image associated with your e-mail
                        address.
                        </p>
                        <p>Is it okay to use this photo?</p>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFacturas : () => dispatch(agentesActions)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FacturasModal);