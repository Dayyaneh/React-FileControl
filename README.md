# React File Elemet

### Features
- Support all types of files.
- Support Drag and drop file(s)
- Developer can define multiple or single mode of file(s) choosing.

### Parameter                   
Param         | Description
------------- | -------------
maxFileSize   | Indicate the maximum of the limition of each file
accept        | Indicate the accepted file type, if doesn't indicate it will be all
isMultiple    | Indicate the element should allow the user to choose multi file or no



> accept can have the following value 
> - Image
> - PDF
> - Word
> - Excel
> - Audio
> - Video
> - Text
> - HTML
> - All

### Usage
```
  <FileUploader maxFileSize={150} accept={Accept.Image} isMultiple />
```
