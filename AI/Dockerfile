FROM python:3.8.5

COPY . .
RUN pip3 install -r requirements.txt
RUN apt-get update
RUN apt-get install -y libsndfile1-dev
RUN apt-get install -y ffmpeg

EXPOSE 5678

CMD python3 ./flask_api/model.py
