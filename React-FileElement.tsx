import React from 'react';
import FileProto from './others/file';

import './FileUploader.css';
import DragDropArea from './DragDropArea/DragDropArea';
import IconFolder from './others/IconFolder';
import IconTrash from './others/IconTrash';

export class Accept {
    static Image: string = "image/*";
    static PDF: string = "application/pdf";
    static Word: string = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    static Excel: string = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static Audio: string = "audio/*";
    static Video: string = "video/*";
    static Text: string = "text/plain";
    static HTML: string = "text/html";
    static All: string = "*.*";

    static toString = (value?: Accept | null): string => {
        if (value === Accept.Image)
            return Accept.Image;
        else if (value === Accept.PDF)
            return Accept.PDF;
        else if (value === Accept.Word)
            return Accept.Word;
        else if (value === Accept.Excel)
            return Accept.Excel;
        else if (value === Accept.Audio)
            return Accept.Audio;
        else if (value === Accept.Video)
            return Accept.Video;
        else if (value === Accept.Text)
            return Accept.Text;
        else if (value === Accept.HTML)
            return Accept.HTML;

        return Accept.All;
    }
}

interface iComponentProps {
    maxFileSize?: number | null | undefined;
    accept?: Accept | null | undefined;
    isMultiple?: boolean | undefined;
}

interface iComponentState {
    files: FileProto[],
    notificationCaption: string,
    notificationValue: string,
}

class FileUploader extends React.Component<iComponentProps, iComponentState> {
    private fileControl: HTMLInputElement | null | undefined;

    constructor(props: any) {
        super(props);
        this.state = {
            files: [],
            notificationCaption: '',
            notificationValue: '',
        };

        this.onChangeFile = this.onChangeFile.bind(this);
        this.getFileNameforRender = this.getFileNameforRender.bind(this);
        this.onFileLoadEnd = this.onFileLoadEnd.bind(this);
        this.onDragDropFileChosen = this.onDragDropFileChosen.bind(this);
    }

    getFileNameforRender = () => {
        if (this.state) {
            if (this.state.files) {
                if (this.state.files.length > 0) {
                    if (this.state.files?.length === 1)
                        return this.state.files[0].fileName;
                    else
                        return this.state.files.length + ' files chosen';
                }
            }
        }
        return '';
    }

    onFileLoadEnd(file: any) {
        try {
            const fileBinary = file.target.result;

            if (fileBinary === "") {
                this.setState({
                    notificationCaption: 'error',
                    notificationValue: 'your chosen file is not acceptable',
                });
                return false;
            }

            if (this.props.maxFileSize) {
                if (fileBinary.length > (this.props.maxFileSize * 1024)) {
                    this.setState({
                        notificationCaption: 'error',
                        notificationValue: 'your chosen file is not fit enough',
                    });
                    return false;
                }
            }

            this.setState({
                files: [...this.state.files, new FileProto(file.target.fileName, fileBinary)],
                notificationCaption: '',
                notificationValue: '',
            });

            return true;
        }
        catch (ex) {
            this.setState({
                notificationCaption: 'error',
                notificationValue: 'your chosen file is not acceptable',
            });
        }
    }

    onFileButtonClick = () => {
        this.fileControl?.click();
    }

    onRestButtonClick = () => {
        this.setState({
            files: []
        });
    }

    onChangeFile() {
        try {
            if (!this.fileControl?.files) {
                return false;
            }
            if (this.fileControl?.files.length < 1) {
                return false;
            }

            this.setState({ files: [] });

            for (let i = 0; i < this.fileControl?.files.length; i++) {
                const reader = new FileReader();
                Object.defineProperty(reader, 'fileName', { value: this.fileControl?.files[i].name })
                reader.onloadend = this.onFileLoadEnd.bind(this);
                reader.readAsDataURL(this.fileControl?.files[i]);
            }
        } catch (ex) {
            return false;
        }
    }

    onDragDropFileChosen(files: FileList) {
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            Object.defineProperty(reader, 'fileName', { value: files[i].name })
            reader.onloadend = this.onFileLoadEnd.bind(this);
            reader.readAsDataURL(files[i]);
        }
    }

    inputOption = {
        multiple: this.props.isMultiple,
        accept: Accept.toString(this.props.accept),
    }
    
    render() {
        return (<div className="md-file-upload">
            <div className="control-container">
                <input className="file-name-text" placeholder="Choose your file"
                    value={this.getFileNameforRender()} readOnly />
                <button className="file-button md-button" onClick={() => this.onFileButtonClick()}>
                    <IconFolder />
                </button>
                <input ref={(ref) => this.fileControl = ref}
                    type="file"
                    {...this.inputOption}
                    style={{ display: 'none' }}
                    onChange={() => this.onChangeFile()} />
            </div>
            <div className='control-notification'>
                {this.state.notificationCaption &&
                    <p className="notification-caption">
                        {this.state.notificationCaption}&nbsp;:&nbsp;
                    <b>{this.state.notificationValue}</b>
                    </p>
                }
            </div>
            <div className="preview">
                <div className="drag-container">
                    <DragDropArea onFilesChosen={this.onDragDropFileChosen}></DragDropArea>
                </div>
                {this.state.files && this.state.files.length > 0 &&
                    <div className="action-container">
                        {this.props.maxFileSize &&
                            <p className="maximum-size-caption">Maximum File Size: <b>{this.props.maxFileSize}</b></p>
                        }
                        {this.state.files && this.state.files.length > 0 &&
                            <button className="reset-button md-button" onClick={() => { this.onRestButtonClick() }}>
                                <IconTrash />
                            </button>
                        }
                    </div>
                }
            </div>
        </div>);
    }
}

export default FileUploader;
