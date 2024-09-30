import { RemovalPolicy, Stack, StackProps, Tags } from "aws-cdk-lib";
import { Repository, TagMutability } from "aws-cdk-lib/aws-ecr";
import { Construct } from "constructs";
import { AccountPrincipal, CompositePrincipal } from "aws-cdk-lib/aws-iam";
import { AwsAccount } from "../config/types";

export interface SharedAssetsProps extends StackProps {
  ecrRepository: string[];
}

export class SharedAssetsStack extends Stack {
  constructor(scope: Construct, id: string, props: SharedAssetsProps) {
    super(scope, id, props);

    const allAwsAccounts = Object.values(AwsAccount).map((accountId) => new AccountPrincipal(accountId));

    for (const repositoryName of props.ecrRepository) {
      const repository = new Repository(this, repositoryName, {
        repositoryName: repositoryName,
        removalPolicy: RemovalPolicy.DESTROY,
        imageTagMutability: TagMutability.IMMUTABLE,
        imageScanOnPush: true,
      });
      const principals = new CompositePrincipal(...allAwsAccounts);
      repository.grantPullPush(principals);
    }

    Tags.of(this).add("CreatedBy", "CDK");
  }
}
