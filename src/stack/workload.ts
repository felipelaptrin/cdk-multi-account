import { RemovalPolicy, Stack, StackProps, Tags } from "aws-cdk-lib";
import { Construct } from "constructs";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { Environment } from "../config/types";

export interface WorkloadProps extends StackProps {
  environment: Environment;
}

export class WorkflowStack extends Stack {
  constructor(scope: Construct, id: string, props: WorkloadProps) {
    super(scope, id, props);

    new Bucket(this, `${props.environment}-bucket-ingestion`, {
      enforceSSL: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    Tags.of(this).add("CreatedBy", "CDK");
  }
}
