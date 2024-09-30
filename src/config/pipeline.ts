import { PipelineProps } from "../pipeline/codepipeline";
import { AwsAccount } from "./types";

export const pipelineProps: PipelineProps = {
  env: {
    account: AwsAccount.SharedAssets,
    region: "us-east-2",
  },
  gitBranch: "main",
  githubOwner: "felipelaptrin",
  githubRepository: "cdk-multi-account",
  codeStarConnectionArn:
    "arn:aws:codestar-connections:us-east-2:730335516527:connection/e5eab608-7653-42d0-b21a-c456dcf2b051",
};
