import React, {useRef, useState} from 'react';
import { FilePond } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css'
import {FilePondFile} from "filepond";

interface FileUploaderProps {
    onUploadComplete: (v: string) => void;
    fileTypes: string[];
  }

function arrayBufferToString(buffer: ArrayBuffer){
    const arr = new Uint16Array(buffer);
    const str = String.fromCharCode.apply(String,
        (arr as unknown as number[]));
    if(/[\u0080-\uffff]/.test(str)){
        throw new Error("this string seems to contain (still encoded) multibytes");
    }
    return str;
}

export const FileUploader = (props: FileUploaderProps) => {
    const filePondRef = useRef<FilePond>(null);
    const [files, setFiles] = useState<FilePondFile[]>([]);
    const processAndOutputFile = (err: any, file: FilePondFile) => {
        const coreFile = file.file;
        const reader = new FileReader();
        reader.onload = (evt) => {
            console.log(evt);
            if (evt?.target?.result) {
                const ress = evt.target.result;
                if (typeof ress === 'string') {
                    console.log('STRING');
                    props.onUploadComplete(ress);
                } else {
                    console.log('ARRAYBUFFER');
                    const strOut = arrayBufferToString(ress);
                    props.onUploadComplete(strOut);
                }
            } else {
                console.log('NULL');
                // null
            }
        };
        reader.onerror = (evt) => {
            console.error(evt);
        };
        reader.readAsText(coreFile);
    };
       return (
             <div>
              <FilePond
                  instantUpload={false}
                  ref={filePondRef}
                  files={files as any}
                  onupdatefiles={setFiles}
                  onaddfile={processAndOutputFile}
                  allowMultiple={false}
                  dropOnPage
                  server="" // your file upload api
                  name="files"
                  dropValidation
              />
        </div>
       );

}