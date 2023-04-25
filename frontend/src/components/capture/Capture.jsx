import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./capture.css"


export default function Capture() {
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const location = useLocation();

    const handleDataAvailable = useCallback(
        ({ data }) => {
            if (data.size > 0) {
                console.log(data);
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleStartCaptureClick = useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm",
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

    const handleStopCaptureClick = useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, setCapturing]);

    const handleDownload = useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {

            });
            let formData = new FormData();
            formData.append("file", blob);
            formData.append("name", location.state.name);
            axios.post('/api/video/capture', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            setRecordedChunks([]);
        }
    }, [recordedChunks]);

    const videoConstraints = {
        width: 420,
        height: 420,
        facingMode: "user",
    };

    return (
        <div class="container">
            <div class="form-box">

            <div className="Container">
            <Webcam
                height={400}
                width={400}
                audio={false}
                mirrored={true}
                ref={webcamRef}
                videoConstraints={videoConstraints}
            />
            {capturing ? (
                <button onClick={handleStopCaptureClick}>Stop Capture</button>
            ) : (
                <button onClick={handleStartCaptureClick}>Start Capture</button>
            )}
            {recordedChunks.length > 0 && (
                <button onClick={handleDownload}>Download</button>
            )}
        </div>

                <div class="btn-field">
                    <button type="button" id="signupBtn">Start Capture</button>
                </div>
            </div>
        </div>
    )
}