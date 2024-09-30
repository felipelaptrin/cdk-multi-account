import { Stack, StackProps, Stage, StageProps, Tags } from "aws-cdk-lib";
import { CodePipeline, CodePipelineSource, ManualApprovalStep, ShellStep } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { SharedAssetsProps, SharedAssetsStack } from "../stack/shared-assets";
import { WorkflowStack, WorkloadProps } from "../stack/workload";
import { developmentProps } from "../config/development";
import { productionProps } from "../config/production";
import { sharedAssetsProps } from "../config/shared-assets";

export interface PipelineProps extends StackProps {
  gitBranch: string;
  githubOwner: string;
  githubRepository: string;
  codeStarConnectionArn: string;
}

export class SharedAssetsPipelineStage extends Stage {
  constructor(scope: Construct, id: string, sharedAssetsProps: SharedAssetsProps, props?: StageProps) {
    super(scope, id, props);

    new SharedAssetsStack(this, "StageStack", sharedAssetsProps);
  }
}

export class WorkloadPipelineStage extends Stage {
  constructor(scope: Construct, id: string, workloadProps: WorkloadProps, props?: StageProps) {
    super(scope, id, props);

    new WorkflowStack(this, "WorkflowStack", workloadProps);
  }
}

export class CodePipelineStack extends Stack {
  constructor(scope: Construct, id: string, props: PipelineProps) {
    super(scope, id, props);

    const branch = props.gitBranch;
    const githubRepository = `${props.githubOwner}/${props.githubRepository}`;
    const githubConnection = CodePipelineSource.connection(githubRepository, branch, {
      connectionArn: props.codeStarConnectionArn,
    });

    const pipeline = new CodePipeline(this, "PipelineStack", {
      pipelineName: "MultiAccountPipeline",
      synth: new ShellStep("Synth", {
        input: githubConnection,
        commands: ["yarn", "yarn run cdk synth"],
        primaryOutputDirectory: "cdk.out",
      }),
      selfMutation: true,
      crossAccountKeys: true,
    });

    pipeline.addStage(new SharedAssetsPipelineStage(this, "SharedAssetsStage", sharedAssetsProps));
    pipeline.addStage(new WorkloadPipelineStage(this, "DevelopmentStage", developmentProps));
    pipeline.addStage(new WorkloadPipelineStage(this, "ProductionStage", productionProps), {
      pre: [new ManualApprovalStep("Release to production")],
    });

    Tags.of(this).add("CreatedBy", "CDK");
  }
}
