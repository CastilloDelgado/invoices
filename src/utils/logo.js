import React from 'react';
import { Image } from 'semantic-ui-react';
import { connect } from 'react-redux'

const Logo = ({image, ...props}) => {
    return <Image 
        {...props}
        src={`http://kronosoftmx.com/kronomx.com/nexus/${image}`} 
        wrapped
    />
}

const mapStateToProps = ({config}) => {
    return {
        image : config.json.image ? config.json.image : 'default.jpg'
    }
}

export default connect(mapStateToProps)(Logo)