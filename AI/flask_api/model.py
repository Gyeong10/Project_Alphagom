import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import numpy as np
import librosa
import tensorflow as tf
from flask_cors import CORS, cross_origin
from flask import Flask, request
import ffmpeg
import warnings
warnings.filterwarnings('ignore')

app = Flask(__name__)
app.config['DEBUG'] = True
CORS(app)


@app.route('/api/ai/check', methods=["POST"])
@cross_origin()
def check():
    # 저장된(학습된) 모델 가져오기
    model = tf.keras.models.load_model('../check_determine_model220927.h5')

    file = request.files['audio_data']
    path='./audio.wav'
    file.save(path)

    audio_input = ffmpeg.input('./audio.wav')
    audio_cut = audio_input.audio.filter('atrim', duration=1)
    audio_output = ffmpeg.output(audio_cut, './audio_output.wav')
    ffmpeg.run(audio_output)

    path='./audio_output.wav'

    wav, sr= librosa.load(path, sr=16000)

    mfcc = librosa.feature.mfcc(wav, sr=16000, n_mfcc=100, n_fft=400, hop_length=160)
    # mfcc = sklearn.preprocessing.scale(mfcc, axis=1)
    pad2d = lambda a, i: a[:, 0:i] if a.shape[1] > i else np.hstack((a, np.zeros((a.shape[0], i-a.shape[1]))))
    padded_mfcc = pad2d(mfcc, 110)
    padded_mfcc = np.expand_dims(padded_mfcc, 0)

    result = model.predict(padded_mfcc)

    # 판별 완료된 음성 파일 삭제
    os.remove('./audio.wav')
    os.remove('./audio_output.wav')

    # 어떤 결과를 리턴시켜야 하나(응 : 0, 아니 : 1)
    if np.argmax(result) == 0:
        return "응"
    else:
        return "아니"

@app.route('/api/ai/swamp/word', methods=["POST"])
@cross_origin()
def swamp_word():
    
    model = tf.keras.models.load_model('../word_determine_model221001.h5')
     # 받아온 오디오 데이터

    file = request.files['audio_data']
    path='./audio.wav'
    file.save(path)

    audio_input = ffmpeg.input('./audio.wav')
    audio_cut = audio_input.audio.filter('atrim', duration=1)
    audio_output = ffmpeg.output(audio_cut, './audio_output.wav')
    ffmpeg.run(audio_output)

    path='./audio_output.wav'

    wav, sr= librosa.load(path, sr=16000)

    mfcc = librosa.feature.mfcc(wav, sr=16000, n_mfcc=100, n_fft=400, hop_length=160)
    # mfcc = sklearn.preprocessing.scale(mfcc, axis=1)
    pad2d = lambda a, i: a[:, 0:i] if a.shape[1] > i else np.hstack((a, np.zeros((a.shape[0], i-a.shape[1]))))
    padded_mfcc = pad2d(mfcc, 110)
    padded_mfcc = np.expand_dims(padded_mfcc, 0)

    result = model.predict(padded_mfcc)

    # 판별 완료된 음성 파일 삭제
    os.remove('./audio.wav')
    os.remove('./audio_output.wav')

    # 어떤 결과를 리턴시켜야 하나(냠냠 : 0, 드르륵 : 1, 보글보글 : 2, 사각사각 : 3, 송송 : 4, 주르륵 : 5, 탁탁 : 6, 툭툭 : 7, 팔팔 : 8, 풀풀 : 9, 휘휘 : 10)
    if np.argmax(result) == 0:
        return "냠냠"
    elif np.argmax(result) == 1:
        return "드르륵"
    elif np.argmax(result) == 2:
        return "보글보글"
    elif np.argmax(result) == 3:
        return "사각사각"
    elif np.argmax(result) == 4:
        return "송송"
    elif np.argmax(result) == 5:
        return "주르륵"
    elif np.argmax(result) == 6:
        return "탁탁"
    elif np.argmax(result) == 7:
        return "툭툭"
    elif np.argmax(result) == 8:
        return "팔팔"
    elif np.argmax(result) == 9:
        return "풀풀"
    elif np.argmax(result) == 10:
        return "휘휘"

@app.route('/api/ai/sky/bird', methods=["POST"])
@cross_origin()
def sky_bird():
    model = tf.keras.models.load_model('../bird_determine_model220928.h5')
    # 받아온 오디오 데이터
    file = request.files['audio_data']
    path='./audio.wav'
    file.save(path)

    audio_input = ffmpeg.input('./audio.wav')
    audio_cut = audio_input.audio.filter('atrim', duration=1)
    audio_output = ffmpeg.output(audio_cut, './audio_output.wav')
    ffmpeg.run(audio_output)

    path='./audio_output.wav'
    
    wav, sr = librosa.load(path, sr=16000)
    
    mfcc = librosa.feature.mfcc(wav, sr=16000, n_mfcc=100, n_fft=400, hop_length=160)
    # mfcc = sklearn.preprocessing.scale(mfcc, axis=1)
    pad2d = lambda a, i: a[:, 0:i] if a.shape[1] > i else np.hstack((a, np.zeros((a.shape[0], i-a.shape[1]))))
    padded_mfcc = pad2d(mfcc, 110)
    padded_mfcc = np.expand_dims(padded_mfcc, 0)

    result = model.predict(padded_mfcc)

    # 판별 완료된 음성 파일 삭제
    os.remove('./audio.wav')
    os.remove('./audio_output.wav')

    # 어떤 결과를 리턴시켜야 하나(까마귀 : 0, 꿩 : 1, 뱁새 : 2, 오리 : 3, 참새 : 4, 황새 : 5)
    
    if np.argmax(result) == 0:
        return "까마귀"
    elif np.argmax(result) == 1:
        return "꿩"
    elif np.argmax(result) == 2:
        return "뱁새"
    elif np.argmax(result) == 3:
        return "오리"
    elif np.argmax(result) == 4:
        return "참새"
    elif np.argmax(result) == 5:
        return "황새"

# BE 배포 전까지 게임 갖고 오는 API
@app.route('/api/ai/king', methods=["GET"])
@cross_origin()
def kingcure():
    test_result = [
  {
    "answer": "팔팔",
    "example": [
      "팔팔",
      "풀풀",
      "턱턱",
      "송송"
    ],
    "sentance": "물을 ** 끓여 손질된 닭을 넣어요"
  },
  {
    "answer": "탁탁",
    "example": [
      "탁탁",
      "팔팔",
      "턱턱",
      "사각사각"
    ],
    "sentance": "갖가지 재료를 ** 썰어 넣어요"
  },
  {
    "answer": "보글보글",
    "example": [
      "보글보글",
      "사각사각",
      "드르륵",
      "풀풀"
    ],
    "sentance": "삼계탕이 ** 끓고 있어요"
  },
  {
    "answer": "송송",
    "example": [
      "송송",
      "턱턱",
      "사각사각",
      "주르륵"
    ],
    "sentance": "대추를 ** 썰어 올려요"
  },
  {
    "answer": "휘휘",
    "example": [
      "휘휘",
      "주르륵",
      "팔팔",
      "보글보글"
    ],
    "sentance": "잘 익도록 국자로 ** 저어서 완성해요"
  }
]
    return test_result

@app.route('/api/ai/bird', methods=["GET"])
@cross_origin()
def skybird():
    test_result = [{
        "answer": "참새",
        "example": [
            "참새",
            "꿩",
            "까마귀",
            "오리",
            "뱁새",
            "황새"
        ],
        "sentance": "**가 방앗간을 그냥 지나치랴"
        },
        {
        "answer": "황새",
        "example": [
            "참새",
            "꿩",
            "까마귀",
            "오리",
            "뱁새",
            "황새"
        ],
        "sentance": "뱁새가 **걸음을 하면 가랑이가 찢어진다"
        },
        {
        "answer": "까마귀",
        "example": [
            "참새",
            "꿩",
            "까마귀",
            "오리",
            "뱁새",
            "황새"
        ],
        "sentance": "*** 날자 배 떨어진다"
        }
        ]
    return test_result

if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5678",  debug=True)
