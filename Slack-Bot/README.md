# Serverless slack

We can build a serverless celebrity detecting application integrated with [Slack](https://slack.com/). The core functionality is based on [AWS ](https://aws.amazon.com/) and utilizes the following services.
1. [Amazon Rekognition](https://aws.amazon.com/rekognition/)
1. [AWS S3](https://aws.amazon.com/s3)
1. [Amazon API Gateway](https://aws.amazon.com/api-gateway/)
1. [AWS Lambda](https://aws.amazon.com/lambda/)
1. [AWS CloudFormation](https://aws.amazon.com/cloudformation/)


## Flow
1. The image can be uploaded to the User in the Slack channel
2. Amazon API Gateway is invoked by the Slack 
3. The lambda function is invocated by API Gateway
4. The image is scanned by AWS Rekoginition to detect the celebrity in the image. 
10. Response is posted to the chat channel


![Architecture diagram](https://findceleb1.s3-us-west-2.amazonaws.com/img/Architecture.jpg)

## Steps
### Create Slack App
1. Login to [Slack](https://slack.com/) and [create an app](https://api.slack.com/apps?new_app=1). Refer the [Tutorial](https://api.slack.com/slack-apps#creating_apps)   
1. Click `Basic Information` tab under `Settings`. Write down the `Verification Token`
1. Go to `OAuth & Permissions` tab under `Features`
	1. Under `Permissions Scopes` section add the following permission scopes
		* files:read
		* files:write:user
		* chat:write:bot
		* channels:history
	1. Click `Save Changes`. Then click `Install App to Team` and then `Authorize`
	1. Write down the `OAuth Access Token`


### AWS Backend creation

AWS Cloudformation template is provided to facilitate the deployment. The resources are created in us-west-2 (Oregon). Click [![Launch Stack into Oregon with CloudFormation](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/images/cloudformation-launch-stack-button.png)](https://console.aws.amazon.com/cloudformation/home?region=us-west-2#/stacks/new?stackName=celeb_finder&templateURL=https://findceleb1.s3-us-west-2.amazonaws.com/cloudformation/celeb_finder.serverless.yaml) button to create the services in your account. 

1. **PS: Use this [template](https://findceleb1.s3-us-west-2.amazonaws.com/cloudformation/celeb_finder.serverless.yaml) if the above link doesn't work**
2. Give the AWS Cloudformation permission to `create IAM resources` and `create IAM resources with custom names`
3. Then click on `Create Change Set`
4. Finally click `Execute`


### Finalize Slack Event Subscription
1. Go to the Cloudformation stack created to note down the `RequestURL` under the `output` section
1. Return to Slack App settings page
	1. Navigate to `Event Subscriptions` tab under `Features` and enable events
	1. Navigate to `Request URL` field  and enter the `RequestURL` value 
	1. Click on `Add Team Event` and select `message.channels`. Click `Save Changes`


### Testing the Example
Now go to the Slack app and go to `#random` channel. Upload an image and you would find your app identifying animals in it. 

![Test run](https://findceleb1.s3-us-west-2.amazonaws.com/img/results.png)


## Cleaning Up 

Delete the CloudFormation stack, and then the CloudWatch log groups associated with each Lambda function created by the CloudFormation stack.




## Services

### CloudFormation Stack
* A Stack named **CelebFinder** is first created 

### AWS Lambda

* **Function** - CelebFinder
	- Function to validate slack event messages and check images

### AWS IAM
* **LambdaRekognitionRole** - IAM Role with policy that allows Lambda function to invoke "rekognition:DetectLabels" API call and write log messages to CloudWatch Logs.

### Amazon API Gateway
1. **CelebFinderAPI:** - API for wildlife finder app
1. **CelebFinderAPIProdStage** - Implicitly created production stage for API



## References 
[Image Recognition and Processing Serverless reference](https://github.com/awslabs/lambda-refarch-imagerecognition)
