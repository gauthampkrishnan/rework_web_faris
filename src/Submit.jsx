import React, { useContext } from 'react';
import DataContext from './DataContext';

function SubmitButton() {
  const { data } = useContext(DataContext);
  // const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://server-faris-a02ca80e363b.herokuapp.com/generate-pdf`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        // Assuming the server sends back a PDF file as a response
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'data.pdf'; // You can name the download as you wish
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
        a.remove();
      } else {
        // Handle any errors returned by the server here
        console.error('Server responded with a status:', response.status);
      }
    } catch (error) {
      // Handle the error here
      console.error('An error occurred:', error);
    }
  };

  return <button onClick={handleSubmit}>Generate PDF</button>;
}

export default SubmitButton;
