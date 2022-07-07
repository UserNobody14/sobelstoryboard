import React, {useState} from 'react';
import { FilePond } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css'
import {FilePondFile} from "filepond";

interface FileUploaderProps {
    onUploadComplete: () => void;
    fileTypes: string[];
  }

export const FileUploader = (props: FileUploaderProps) => {
    const [files, setFiles] = useState<FilePondFile[]>([]);
       return (
             <div>
              <FilePond
            files={files as any}
            onupdatefiles={setFiles}
            allowMultiple={false}
            dropOnPage
            server="/api" // your file upload api
            name="files"
            dropValidation
          />
        </div>
       );

}