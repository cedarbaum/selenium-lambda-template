import * as cdk from "@aws-cdk/core";
import * as pythonLambda from "@aws-cdk/aws-lambda-python";
import * as lambda from "@aws-cdk/aws-lambda";

import * as path from "path";
import { Duration } from "@aws-cdk/core";

export class SeleniumLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new lambda.DockerImageFunction(this, "SeleniumRunner", {
      code: lambda.DockerImageCode.fromImageAsset(
        path.join(__dirname, "../docker/"),
        {
          entrypoint: ["/lambda-entrypoint.sh"],
          buildArgs: {'--platform': 'linux/amd64'},
        }
      ),
      memorySize: 1048,
      timeout: Duration.minutes(1),
    });
  }
}
