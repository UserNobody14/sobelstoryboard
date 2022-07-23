from __future__ import print_function
import boto3
import os
import requests
import uuid
import json
import base64
from dry_run import b64_dry_run

s3_client = boto3.client('s3')


def to_str_num(numvalue):
    return '{}'.format(numvalue)


def request_image(txt, dry_run):
    new_map_data = {
        'text': txt,
        'num_images': 1,
    }
    if dry_run:
        return {
            'generatedImgs': [b64_dry_run],
            'generatedImgsFormat': 'jpg',
        }
    response = requests.post(os.environ['DALLE_GPU_PROCESSOR_URL'], data=json.dumps(new_map_data))
    img_map = response.json()
    # img_map = { 'generatedImgs': response.text}
    return img_map


def save_to_s3(imgval, imgtype, uniquenum, scenenum, linenum):
    bucket = "fountaindalle"
    key = "{}/{}/{}".format(uniquenum, scenenum, linenum)
    tmpkey = key.replace('/', '')
    download_path = '/tmp/{}{}.{}'.format(uuid.uuid4(), tmpkey, imgtype)
    # upload_path = '/tmp/resized-{}'.format(tmpkey)
    with open(download_path, "wb") as fh:
        fh.write(base64.b64decode(imgval))
    # s3_client.download_file(bucket, key, download_path)
    # resize_image(download_path, upload_path)
    s3_client.upload_file(download_path, bucket, '{}.{}'.format(key, imgtype))


def lambda_handler(event, context):
    for record in event['Records']:
        payload = record["body"]
        json_values = json.loads(payload)
        # print(str(json_values["text"]))
        image_map = request_image(json_values["text"],
                                  False if 'dry_run' not in json_values else json_values['dry_run'])
        generated_imgs = image_map['generatedImgs']
        generated_imgs_format = image_map['generatedImgsFormat']
        # print(final_output)
        count = 0
        for img_data in generated_imgs:
            save_to_s3(img_data, generated_imgs_format,
                       json_values["unique_number"],
                       json_values["scene_number"],
                       json_values["line_number"])
            count = count + 1
