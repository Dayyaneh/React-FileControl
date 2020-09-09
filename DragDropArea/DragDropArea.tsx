import React, { Component } from 'react'

import './DragDropArea.css';
import IconFileUpload from '../others/IconFileUpload';
import IconDrag from '../others/IconDrag';
import IconAddFile from '../others/IconAddFile';

interface iComponentProp {
    onFilesChosen?: Function
}

interface iComponentState {
    dragging: boolean,
    dragCounter: number,
}

class DragDropArea extends Component<iComponentProp, iComponentState> {
    constructor(prop: iComponentProp) {
        super(prop);
        this.state = {
            dragging: false,
            dragCounter: 0,
        }
    }
    dropRef = React.createRef()

    handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    handleDragIn = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation();
        this.setState({
            dragCounter: this.state.dragCounter + 1
        })
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({ dragging: true })
        }
    }

    handleDragOut = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        this.setState({
            dragCounter: this.state.dragCounter - 1
        })
        if (this.state.dragCounter === 0) {
            this.setState({ dragging: false });
        }
    }

    handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ dragging: false });
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.props.onFilesChosen && this.props.onFilesChosen(e.dataTransfer.files);
            e.dataTransfer.clearData();
            this.setState({
                dragCounter: 0
            })
        }
    }

    render() {
        return (
            <div className='drag-drop-area'
                onDragEnter={this.handleDragIn} onDragLeave={this.handleDragOut}
                onDragOver={this.handleDrag} onDrop={this.handleDrop}>
                <p>Drag your file(s) here</p>
                {this.state.dragging &&
                    <>
                        <IconAddFile />
                    </>
                }
                {!this.state.dragging &&
                    <>
                        <IconAddFile />
                        {/* <IconFileUpload /> */}
                    </>
                }
            </div>
        )
    }
}
export default DragDropArea