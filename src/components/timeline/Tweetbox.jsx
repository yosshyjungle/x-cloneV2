import React, { useState } from 'react';
import { Avatar, Button, CircularProgress } from '@mui/material';
import './Tweetbox.css'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import db from '../../firebase';
import { div } from 'framer-motion/client';


function Tweetbox() {

    const [ tweetMessage, setTweetMessage ] = useState("");
    // const [ tweetImage, setTweetImage ] = useState("");
    const [ imageFile, setImageFile ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ preview, setPreview ] = useState("");
    const [ error, setError ] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            if(file.size > 5 * 1024 * 1024) {
                setError("ファイルサイズは5MB以下にしてください");
                return;
            }
            setImageFile(file);
            // URL.createObjectURL(file) 一時的にURLを作成　ローカルにファイルを直接ブラウザで表示できる
            setPreview(URL.createObjectURL(file));
            setError("");
        }
    };

    const convertToBase64 = (file) => {
        // Promise 非同期処理 resolve：成功、reject:失敗
        return new Promise((resolve, reject) => {
            // new FileReader()…ローカルファイルを読み込む
            const reader = new FileReader();
            // readAdDataURL…BASE64へエンコード
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        })
    }

    const sendTweet = async (e) => {
        e.preventDefault();
        if(!tweetMessage && !imageFile){
            setError("テキストが画像を入力してください");
            return
        }
        setLoading(true);
        try {
            let base64Image = "";
            if(imageFile) {
                if(imageFile.size > 5 * 1024 * 1024){
                    setError("ファイルサイズは5MBいかにしてください");
                    setLoading(false);
                    return;
                }
                base64Image = await convertToBase64(imageFile);
            }
            await addDoc(collection(db, "posts"), {
                displayName: "Nissho code",
                userName: "nissho_code",
                verified: true,
                text: tweetMessage,
                avatar: "https://yosshyjungle.sakura.ne.jp/oa_works/smile_man.png",
                image: base64Image,
                timestamp: serverTimestamp(),
            });
            setTweetMessage("");
            // setTweetImage("");
            setImageFile(null);
            setPreview("");
            setError("");
        } catch(err) {
            setError("投稿に失敗しました。再度お試しください。");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className='tweetBox'>
        <form>
            <div className='tweetBox_input'>
                <Avatar />
                <input 
                value={tweetMessage}
                placeholder='いまどうしてる'
                type="text"
                onChange={(e)=> setTweetMessage(e.target.value)}
                required
                />
            </div>
            <div className='tweetBox_imageInputContainer'>
                <input
                 className='tweetBox_imageInput'
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                />
            </div>
            {preview && (
                <div className='tweetBox_preview'>
                    <img
                     src={preview}
                     alt="preview"
                     style={{maxWidth: "100%", maxHeight: "200px"}} />  
                </div>
            )}
            {error && <p className='tweetBox_error'>{error}</p>}
                <Button
                 className='tweetBox_tweetButton'
                 type='submit'
                 onClick={sendTweet}
                 disabled={loading}
                 >
                    {loading ? <CircularProgress size={24} /> : "Postする"}
                 </Button>
        </form>
    </div>
  )
}

export default Tweetbox