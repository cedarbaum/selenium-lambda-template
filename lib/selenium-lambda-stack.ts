import * as cdk from '@aws-cdk/core';
import * as pythonLambda from "@aws-cdk/aws-lambda-python";
import * as lambda from "@aws-cdk/aws-lambda";

import * as path from 'path';

export class SeleniumLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const chromeDriverLayer = new lambda.LayerVersion(
      this,
      "ChromeDriverLayer",
      {
        code: lambda.Code.fromAsset(path.join('chromedriver', 'chromedriver.zip')),
        compatibleRuntimes: [lambda.Runtime.PYTHON_3_7],
      }
    );

    const seleniumFunction = new pythonLambda.PythonFunction(
      this,
      "seleniumFunction",
      {
        entry: "function",
        runtime: lambda.Runtime.PYTHON_3_7,
        memorySize: 752,
        layers: [chromeDriverLayer]
      }
    );
  }
}
