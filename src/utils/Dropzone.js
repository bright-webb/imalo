// DropzoneFileUpload.jsx
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Button, Message } from 'semantic-ui-react';

const DropzoneFileUpload = ({ onFilesChange }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    onFilesChange((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, [onFilesChange]);

  const removeFile = (indexToRemove) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*', // Only allow image files
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);
  const token = localStorage.getItem('token');
  const handleUpload = () => {
    setLoading(true);
    const url = "https://api.imbapano.com/api/upload/files";
    const formData = new FormData();
    let file = files[0];
    files.forEach((file, index) => {
      formData.append(`files[]`, file);
    })
    formData.append("file", file);
    formData.append('property_id', localStorage.getItem('property_id'));
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData
    })
      .then((response) => {
        return response.json();
        
      })
      .then((data) => {
        console.log(data)
        if(data.status_code === 201){
          navigate('/preview');
        }
        else{
          setLoading(false);
          setError('There was an error, please try again');
        }
        setLoading(false);
        setError('There was an internal server error, please try again');
      });
  };

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {files.length > 0 && (
        <div>
        
          <div style={thumbnailContainerStyles}>
            {files.map((file, index) => (
              <div key={file.name} style={thumbnailStyles}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  onClick={() => removeFile(index)}
                  style={removeButtonStyles}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    {files.length > 0 && (
        <Button primary className="w-100" onClick={handleUpload} loading={loading}>
          Upload
        </Button>
      )}
        {error && (
          <Message negative style={{width: '100%'}}>
            <Message.Header>Error</Message.Header>
            <p>{error}</p>
          </Message>
        )}
    </div>
  );
};

const dropzoneStyles = {
  border: '2px dashed #ccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  marginBottom: '20px',
};

const thumbnailContainerStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: '10px',
};

const thumbnailStyles = {
  position: 'relative',
  width: '80px',
  height: '80px',
  marginRight: '10px',
  marginBottom: '10px',
  overflow: 'hidden',
  borderRadius: '4px',
  boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
};

const removeButtonStyles = {
  position: 'absolute',
  top: '5px',
  right: '5px',
  padding: '5px',
  background: '#fff',
  color: '#ff0000',
  border: '1px solid #ff0000',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default DropzoneFileUpload;
