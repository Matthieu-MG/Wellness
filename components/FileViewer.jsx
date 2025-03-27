import { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';

function FileViewer({ fileName = "Blood_Test.pdf" }) {
    const [pdfURI, setPdfURI] = useState(null);

    useEffect(() => {
        const loadAsync = async () => {
            try {

                const localUri = `${FileSystem.documentDirectory}MedicalRecords/${fileName}`;
                const fileInfo = await FileSystem.getInfoAsync(localUri);
                
                const files = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}MedicalRecords`);
                console.log("Files in Records: ", files);
                
                if (fileInfo.exists) {
                    const base64File = await FileSystem.readAsStringAsync(localUri, { encoding: FileSystem.EncodingType.Base64 });
                    setPdfURI(`data:application/pdf;base64,${base64File}`);
                } else {
                    console.error("PDF file not found:", localUri);
                }
            }
            catch(error) {
                console.error("ERROR loadAsync: ", error);
            }
        };

        loadAsync();
    }, [fileName]);

    return pdfURI ? (
        <WebView source={{ uri: pdfURI }} style={{ flex: 1 }} />
    ) : null;
}

export default FileViewer;