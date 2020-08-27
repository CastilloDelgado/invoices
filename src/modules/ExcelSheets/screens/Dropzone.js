import React from 'react'
import { Segment, Header, Icon, Button, Modal, Table } from 'semantic-ui-react';

class Dropzone extends React.Component {
	constructor(props) {
		super(props);
        this.onDrop = this.onDrop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = { file : null};
        this.inputRef = React.createRef();
    };

    openDialog = () => {
        this.inputRef.current.click();
    }

    handleClick = () => {
        const { file } = this.state;
        const {handleFile, callback} = this.props;
				console.log(handleFile);
        if(file){
            handleFile(file, callback);
        }
    }

    suppress = () => {
        this.setState({file : null});
    };

	handleChange(e) {
		const files = e.target.files;
		if(files && files[0]) {
            this.setState({file : files[0]})
        }
    };

    onDrop(evt) {
        evt.stopPropagation();
        evt.preventDefault();
				const files = evt.dataTransfer.files;
        if(files && files[0])
            this.props.handleFile(files[0]);
    };

	render() {
		const {open} = this.state;
        const { acceptFiles } = this.props;
        const { file } = this.state;
        const disabled = file === null;
        return (
            <Segment placeholder >
                <Header icon onClick={this.openDialog}>
                    <Icon name='file excel outline'/>
                    Cargue su archivo aquí...
                    <Header.Subheader>{file ? file.name : 'No se ha seleccionado ningún archivo.'}</Header.Subheader>
                </Header>
                <input
                    type="file"
                    id="file"
                    ref={this.inputRef}
                    style={{display: 'none'}}
                    accept={acceptFiles}
                    onChange={this.handleChange}/>
                <Button.Group>
                    <Button onClick={this.suppress}>Cancelar</Button>
                    <Button.Or text='ó'/>
                    <Button
                        positive
                        disabled={disabled}
                        onClick={this.handleClick}>Subir archivo</Button>
                </Button.Group>
            </Segment>
        );
    };
};

export { Dropzone }
