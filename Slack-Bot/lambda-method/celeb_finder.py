import os
import urllib
import boto3
import random

SUPPORTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'] 
MAX_SIZE = 5242880  

VERIFICATION_TOKEN = os.environ['VERIFICATION_TOKEN']  
ACCESS_TOKEN = os.environ['ACCESS_TOKEN'] 


rekognition = boto3.client('rekognition')

def lambda_handler(event, context):
    if not verify_token(event): 
        return

    if event.get('challenge') is not None:  
        challenge = event['challenge']
        return {'challenge': challenge}

    if not validate_event(event): 
        return

    event_details = event['event']
    file_details = event_details['files'][0]
    channel = event_details['channel']
    url = file_details['url_private']
    file_id = file_details['id']
    image_bytes = download_image(url)
    tmp = detect_celebrities(image_bytes) 
    
    lst = ['Wow!! I just found that the person in this picture is ', 'Geez! This is ', 'OMG!! Do you know this is actually ', 'Great, I just found that this person is ']
    if tmp:
        message = random.choice(lst) + tmp
    else:
        message = 'No celebrity found in this image! Try again!!'
    post_message(channel, message)


def verify_token(event):
    if event['token'] != VERIFICATION_TOKEN:
        return False
    return True


def validate_event(event):
    event_details = event['event']
    file_subtype = event_details.get('subtype')

    if file_subtype != 'file_share':
        return False

    file_details = event_details['files'][0]
    mime_type = file_details['mimetype']
    file_size = file_details['size']

    if mime_type not in SUPPORTED_TYPES:
        return False

    if file_size > MAX_SIZE:
        return False

    return True


def download_image(url):
    request = urllib.request.Request(url, headers={'Authorization': 'Bearer %s' % ACCESS_TOKEN})
    return urllib.request.urlopen(request).read()


def detect_celebrities(image_bytes):
    try:
        response = rekognition.recognize_celebrities(Image={'Bytes': image_bytes})
    except Exception as e:
        print(e)
        raise(e)
    labels = response['CelebrityFaces']

    for label in labels:
        return label['Name']

def post_message(channel, message):
    url = 'https://slack.com/api/chat.postMessage'
    data = urllib.parse.urlencode(
        (
            ("token", ACCESS_TOKEN),
            ("channel", channel),
            ("text", message)
        )
    )
    data = data.encode("ascii")
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    request = urllib.request.Request(url, data, headers)
    urllib.request.urlopen(request)
