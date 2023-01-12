import { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import { View, Text, Alert } from 'react-native';

export const Tesseract = () => {
    const [text, setText] = useState('');

    const tesseract = async function () {
        const worker = await createWorker();
        (async () => {
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            const {
                data: { text },
            } = await worker.recognize(
                'https://tesseract.projectnaptha.com/img/eng_bw.png'
            );
            console.log({ text });
            Alert.alert(text);
            console.log({ text });
            setText(() => text);
            await worker.terminate();
        })();
    };

    useEffect(() => {
        tesseract();
        return () => { };
    }, []);

    return (
        <View>
            <Text>{text}</Text>
        </View>
    );
}
