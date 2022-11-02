#SNS - CREATED topic


1-) Create SNS topic by using following command.

 aws --endpoint-url=http://localhost:4566 sns create-topic --name poc-sns --region us-east-1 --profile default --output table | cat

vai aparecer algo mais ou menos assim
------------------------------------------------------------
|                        CreateTopic                       |
+----------+-----------------------------------------------+
|  TopicArn|  arn:aws:sns:us-east-1:000000000000:poc-sns   |
+----------+-----------------------------------------------+

2-) Create SQS queue. This Queue can become a subscriber for AWS SNS topic.
aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name poc-queue --profile default --region us-east-1 --output table | cat
--------------------------------------------------------------
|                         CreateQueue                        |
+----------+-------------------------------------------------+
|  QueueUrl|  http://localhost:4566/000000000000/poc-queue   |
+----------+-------------------------------------------------+

3-) Subscribe SQS queue to SNS topic. This will allow SNS topic to send messages to SQS queue.

aws --endpoint-url=http://localhost:4566 sns subscribe --topic-arn   arn:aws:sns:us-east-1:000000000000:poc-sns --profile default  --protocol sqs --notification-endpoint http://localhost:4566/000000000000/poc-queue --output table | cat

--------------------------------------------------------------------------------------------------------
|                                               Subscribe                                              |
+-----------------+------------------------------------------------------------------------------------+
|  SubscriptionArn|  arn:aws:sns:us-east-1:000000000000:poc-sns:7d01d8a9-2cea-42f5-98aa-807dfac40ac0   |
+-----------------+------------------------------------------------------------------------------------+

4-) Command to send events to SNS topic

aws sns publish --endpoint-url=http://localhost:4566 --topic-arn arn:aws:sns:us-east-1:000000000000:poc-sns --message "bora bill" --profile default --region us-east-1 --output json | cat
{
    "MessageId": "d66d4738-e1fa-4a61-9a58-1c872ff6b052"
}

Read SQS Queue Messages
To read the SQS Queue Messages type the following command in the terminal

aws --endpoint-url=http://localhost:4566 sqs receive-message --queue-url http://localhost:4566/000000000000/poc-queue
