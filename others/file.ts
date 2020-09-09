class FileProto {
    fileId: string;
    fileName?: string;
    fileExtention?: string;
    filePath?: string;
    fileBinary?: number[];
    fileSize?: string;
    /*---------------------------------------------------------------------------------------------------------------*/
    /*---------------------------------------------------------------------------------------------------------------*/
    constructor(filePath: string, fileBinary: number[]) {
        this.fileId = this.generateGuid()
        this.fileBinary = fileBinary;
        this.filePath = filePath;
        this.fileSize = this.getFileSize(fileBinary.length);
        this.fileName = this.getFileName(filePath);
        this.fileExtention = this.getFileExtension(filePath);
    }
    /*---------------------------------------------------------------------------------------------------------------*/
    /*---------------------------------------------------------------------------------------------------------------*/
    private generateGuid = () => {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + '-' + s4() + '-' + s4();
    }
    /*---------------------------------------------------------------------------------------------------------------*/
    private getFileName = (fullPath: string) => {
        try {
            const startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            let filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
            return filename;
        } catch (ex) {
            return "";
        }
    };
    /*---------------------------------------------------------------------------------------------------------------*/
    private getFileExtension = (filename: string) => {
        try {
            return filename.split('.').pop();
        } catch (ex) {
            return '';
        }
    };
    /*---------------------------------------------------------------------------------------------------------------*/
    private getFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Byte';
        const k = 1024;
        const dm = 3;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };
    /*---------------------------------------------------------------------------------------------------------------*/
}

export default FileProto;