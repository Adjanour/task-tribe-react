import React, { FormEventHandler, useState } from 'react';
import {uploadProfileImage} from '../../api/uploadProfile'; // Adjust the path as needed

const ProfileImageUploader = () => {
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState<File|null>(null);
    const [error, setError] = useState<null|string>("");
    const [successMessage, setSuccessMessage] = useState<string|null>("");

    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        if (!imageFile) {
            setError('Please select an image file.');
            return;
        }
        try {
            const response = await uploadProfileImage({description, imageFile});
            setSuccessMessage('Image uploaded successfully!');
            console.log('Upload response:', response);
        } catch (error) {
            setError('Error uploading image. Please try again.');
        }
    };

    return (
        <div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="file"
                        onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                    />
                </div>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default ProfileImageUploader;
